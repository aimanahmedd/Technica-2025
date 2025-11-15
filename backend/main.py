from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import cv2
import mediapipe as mp

app = FastAPI()

# Allow both common dev ports (CRA 3000 and Vite 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MediaPipe setup (single static image per request)
mp_hands = mp.solutions.hands
hands_detector = mp_hands.Hands(static_image_mode=True, max_num_hands=1, min_detection_confidence=0.5)

def check_asl(frame_bytes: bytes, expected_letter: str = "A") -> bool:
    """
    Basic demo heuristic using MediaPipe:
    - Detect one hand, count fingers up (index/middle/ring/pinky).
    - Map a couple letters to finger-count patterns for demo:
       A -> fist (0 fingers up),
       B -> open palm (4 fingers up, thumb folded),
       L -> index + thumb (we won't implement thumb logic fully here).
    Replace this with a trained model for full accuracy.
    """
    # decode bytes -> cv2 image
    nparr = np.frombuffer(frame_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if img is None:
        return False

    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    results = hands_detector.process(img_rgb)

    if not results.multi_hand_landmarks:
        return False

    landmarks = results.multi_hand_landmarks[0].landmark

    # Simple finger-up counting for index/middle/ring/pinky based on landmarks
    tips = [8, 12, 16, 20]  # index, middle, ring, pinky tips
    fingers_up = 0
    for tip in tips:
        # compare y of tip and pip (tip index - 2)
        if landmarks[tip].y < landmarks[tip - 2].y:
            fingers_up += 1

    # demo mapping (very approximate)
    demo_mapping = {
        "A": 0,  # fist
        "B": 4,  # palm open (four fingers up)
        # expand as needed
    }
    expected_count = demo_mapping.get(expected_letter.upper(), None)
    if expected_count is None:
        # default fallback: require at least 1 finger (avoid false positive)
        return fingers_up >= 1
    return fingers_up == expected_count

@app.post("/check")
async def check(file: UploadFile = File(...), letter: str = Form("A")):
    """
    Accepts a single image file (frame) and a form field 'letter'.
    Returns JSON: {"correct": true/false}
    """
    frame_bytes = await file.read()
    correct = check_asl(frame_bytes, letter)
    return {"correct": bool(correct)}
