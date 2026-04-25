#!/usr/bin/env python3
"""
Idempotent seed for IRONLOG — full test data across all modules.

Safe to run multiple times — uses ON CONFLICT DO NOTHING / fixed UUIDs.

Dependencies:
    pip install psycopg2-binary bcrypt python-dotenv

Usage:
    cd iron-log
    python scripts/seed.py
"""

import os
import sys
import bcrypt
import psycopg2
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    sys.exit("DATABASE_URL not found in .env")

# ── Users ──────────────────────────────────────────────────────────────────────
ANNA_ID = "5eed0000-0000-4000-8000-000000000001"
BOB_ID  = "5eed0000-0000-4000-8000-000000000002"

ANNA_EMAIL    = "anna@seed.pl"
ANNA_PASSWORD = "AnnaTest123!"
BOB_EMAIL     = "bob@seed.pl"
BOB_PASSWORD  = "BobTest456!"

# ── Exercises ──────────────────────────────────────────────────────────────────
EXERCISES = [
    ("5eed0000-0000-4001-8001-000000000001", "Bench Press",        "CHEST"),
    ("5eed0000-0000-4001-8001-000000000002", "Incline Dumbbell",   "CHEST"),
    ("5eed0000-0000-4001-8001-000000000003", "Pull-up",            "BACK"),
    ("5eed0000-0000-4001-8001-000000000004", "Barbell Row",        "BACK"),
    ("5eed0000-0000-4001-8001-000000000005", "Squat",              "LEGS"),
    ("5eed0000-0000-4001-8001-000000000006", "Romanian Deadlift",  "LEGS"),
    ("5eed0000-0000-4001-8001-000000000007", "Overhead Press",     "SHOULDERS"),
    ("5eed0000-0000-4001-8001-000000000008", "Lateral Raise",      "SHOULDERS"),
    ("5eed0000-0000-4001-8001-000000000009", "Bicep Curl",         "ARMS"),
    ("5eed0000-0000-4001-8001-000000000010", "Tricep Pushdown",    "ARMS"),
    ("5eed0000-0000-4001-8001-000000000011", "Plank",              "CORE"),
    ("5eed0000-0000-4001-8001-000000000012", "Neck Flexion",       "NECK"),
]

EX = {name: id_ for id_, name, _ in EXERCISES}

# ── Workout Templates ──────────────────────────────────────────────────────────
#   (id, name, userId, [(exerciseId, order)])
TEMPLATES = [
    (
        "5eed0000-0000-4002-8002-000000000001",
        "Anna — Push A",
        ANNA_ID,
        [
            (EX["Bench Press"],     1),
            (EX["Incline Dumbbell"], 2),
            (EX["Overhead Press"],  3),
            (EX["Tricep Pushdown"], 4),
        ],
    ),
    (
        "5eed0000-0000-4002-8002-000000000002",
        "Anna — Pull A",
        ANNA_ID,
        [
            (EX["Pull-up"],      1),
            (EX["Barbell Row"],  2),
            (EX["Bicep Curl"],   3),
        ],
    ),
    (
        "5eed0000-0000-4002-8002-000000000003",
        "Anna — Legs A",
        ANNA_ID,
        [
            (EX["Squat"],             1),
            (EX["Romanian Deadlift"], 2),
            (EX["Plank"],             3),
        ],
    ),
    (
        "5eed0000-0000-4002-8002-000000000004",
        "Bob — Full Body",
        BOB_ID,
        [
            (EX["Squat"],        1),
            (EX["Bench Press"],  2),
            (EX["Barbell Row"],  3),
            (EX["Plank"],        4),
        ],
    ),
    (
        "5eed0000-0000-4002-8002-000000000005",
        "Bob — Upper",
        BOB_ID,
        [
            (EX["Overhead Press"],  1),
            (EX["Pull-up"],         2),
            (EX["Lateral Raise"],   3),
            (EX["Bicep Curl"],      4),
            (EX["Tricep Pushdown"], 5),
        ],
    ),
]

# ── Workout Logs ───────────────────────────────────────────────────────────────
#   (id, name, userId, templateId | None,
#    [(log_exercise_id, exerciseId, name, category, order,
#      [(set_id, weight, reps, rpe, order)])])
LOGS = [
    (
        "5eed0000-0000-4003-8003-000000000001",
        "Anna — Push A — Mon",
        ANNA_ID,
        "5eed0000-0000-4002-8002-000000000001",
        [
            (
                "5eed0000-0000-4004-8004-000000000001",
                EX["Bench Press"], "Bench Press", "CHEST", 1,
                [
                    ("5eed0000-0000-4005-8005-000000000001", 70.0, 8, 7, 1),
                    ("5eed0000-0000-4005-8005-000000000002", 72.5, 6, 8, 2),
                    ("5eed0000-0000-4005-8005-000000000003", 72.5, 6, 8, 3),
                ],
            ),
            (
                "5eed0000-0000-4004-8004-000000000002",
                EX["Overhead Press"], "Overhead Press", "SHOULDERS", 2,
                [
                    ("5eed0000-0000-4005-8005-000000000004", 40.0, 10, 6, 1),
                    ("5eed0000-0000-4005-8005-000000000005", 42.5,  8, 7, 2),
                ],
            ),
        ],
    ),
    (
        "5eed0000-0000-4003-8003-000000000002",
        "Anna — Legs A — Wed",
        ANNA_ID,
        "5eed0000-0000-4002-8002-000000000003",
        [
            (
                "5eed0000-0000-4004-8004-000000000003",
                EX["Squat"], "Squat", "LEGS", 1,
                [
                    ("5eed0000-0000-4005-8005-000000000006", 100.0, 5, 8, 1),
                    ("5eed0000-0000-4005-8005-000000000007", 100.0, 5, 8, 2),
                    ("5eed0000-0000-4005-8005-000000000008", 100.0, 4, 9, 3),
                ],
            ),
            (
                "5eed0000-0000-4004-8004-000000000004",
                EX["Romanian Deadlift"], "Romanian Deadlift", "LEGS", 2,
                [
                    ("5eed0000-0000-4005-8005-000000000009",  80.0, 10, 6, 1),
                    ("5eed0000-0000-4005-8005-000000000010",  80.0,  8, 7, 2),
                ],
            ),
        ],
    ),
    (
        "5eed0000-0000-4003-8003-000000000003",
        "Bob — Full Body — Tue",
        BOB_ID,
        "5eed0000-0000-4002-8002-000000000004",
        [
            (
                "5eed0000-0000-4004-8004-000000000005",
                EX["Squat"], "Squat", "LEGS", 1,
                [
                    ("5eed0000-0000-4005-8005-000000000011", 120.0, 3, 9, 1),
                    ("5eed0000-0000-4005-8005-000000000012", 120.0, 3, 9, 2),
                ],
            ),
            (
                "5eed0000-0000-4004-8004-000000000006",
                EX["Bench Press"], "Bench Press", "CHEST", 2,
                [
                    ("5eed0000-0000-4005-8005-000000000013", 90.0, 5, 8, 1),
                    ("5eed0000-0000-4005-8005-000000000014", 92.5, 4, 9, 2),
                ],
            ),
        ],
    ),
    (
        "5eed0000-0000-4003-8003-000000000004",
        "Bob — Upper — Thu",
        BOB_ID,
        None,
        [
            (
                "5eed0000-0000-4004-8004-000000000007",
                EX["Pull-up"], "Pull-up", "BACK", 1,
                [
                    ("5eed0000-0000-4005-8005-000000000015", 0.0, 10, 7, 1),
                    ("5eed0000-0000-4005-8005-000000000016", 0.0,  8, 8, 2),
                    ("5eed0000-0000-4005-8005-000000000017", 0.0,  6, 9, 3),
                ],
            ),
            (
                "5eed0000-0000-4004-8004-000000000008",
                EX["Lateral Raise"], "Lateral Raise", "SHOULDERS", 2,
                [
                    ("5eed0000-0000-4005-8005-000000000018", 12.0, 15, 6, 1),
                    ("5eed0000-0000-4005-8005-000000000019", 12.0, 12, 7, 2),
                ],
            ),
        ],
    ),
]


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt(rounds=10)).decode()


conn = psycopg2.connect(DATABASE_URL)
cur = conn.cursor()

# Cleanup — delete seed users by email (CASCADE removes templates/logs/tokens)
cur.execute("""
    DELETE FROM "User" WHERE email IN (%s, %s)
""", (ANNA_EMAIL, BOB_EMAIL))

# Users
for uid, email, password in [
    (ANNA_ID, ANNA_EMAIL, ANNA_PASSWORD),
    (BOB_ID,  BOB_EMAIL,  BOB_PASSWORD),
]:
    cur.execute("""
        INSERT INTO "User" (id, email, "passwordHash", "createdAt", "updatedAt")
        VALUES (%s, %s, %s, NOW(), NOW())
        ON CONFLICT DO NOTHING
    """, (uid, email, hash_password(password)))

# Exercises
for ex_id, name, category in EXERCISES:
    cur.execute("""
        INSERT INTO "Exercise" (id, name, category, "createdAt", "updatedAt")
        VALUES (%s, %s, %s, NOW(), NOW())
        ON CONFLICT (id) DO NOTHING
    """, (ex_id, name, category))

# Workout Templates + junction
for tmpl_id, name, user_id, exercise_links in TEMPLATES:
    cur.execute("""
        INSERT INTO "WorkoutTemplate" (id, name, "userId", "createdAt", "updatedAt")
        VALUES (%s, %s, %s, NOW(), NOW())
        ON CONFLICT (id) DO NOTHING
    """, (tmpl_id, name, user_id))
    for ex_id, order in exercise_links:
        cur.execute("""
            INSERT INTO "ExercisesOnWorkoutTemplate"
                ("workoutTemplateId", "exerciseId", "order")
            VALUES (%s, %s, %s)
            ON CONFLICT ("workoutTemplateId", "exerciseId") DO NOTHING
        """, (tmpl_id, ex_id, order))

# Workout Logs + log exercises + sets
for log_id, name, user_id, tmpl_id, log_exercises in LOGS:
    cur.execute("""
        INSERT INTO "WorkoutLog"
            (id, name, "userId", "workoutTemplateId", "createdAt", "updatedAt")
        VALUES (%s, %s, %s, %s, NOW(), NOW())
        ON CONFLICT (id) DO NOTHING
    """, (log_id, name, user_id, tmpl_id))

    for lex_id, ex_id, ex_name, category, order, sets in log_exercises:
        cur.execute("""
            INSERT INTO "WorkoutLogExercise"
                (id, name, category, "order", "workoutLogId",
                 "originalExerciseId", "createdAt", "updatedAt")
            VALUES (%s, %s, %s, %s, %s, %s, NOW(), NOW())
            ON CONFLICT (id) DO NOTHING
        """, (lex_id, ex_name, category, order, log_id, ex_id))

        for set_id, weight, reps, rpe, set_order in sets:
            cur.execute("""
                INSERT INTO "WorkoutLogExerciseSet"
                    (id, weight, reps, rpe, "order",
                     "workoutLogExerciseId", "createdAt", "updatedAt")
                VALUES (%s, %s, %s, %s, %s, %s, NOW(), NOW())
                ON CONFLICT (id) DO NOTHING
            """, (set_id, weight, reps, rpe, set_order, lex_id))

conn.commit()
cur.close()
conn.close()

print("Seed OK")
print(f"\n  {ANNA_EMAIL} / {ANNA_PASSWORD}  (id: {ANNA_ID})")
print(f"    templates: {[t[0] for t in TEMPLATES if t[2] == ANNA_ID]}")
print(f"    logs:      {[l[0] for l in LOGS if l[2] == ANNA_ID]}")
print(f"\n  {BOB_EMAIL} / {BOB_PASSWORD}  (id: {BOB_ID})")
print(f"    templates: {[t[0] for t in TEMPLATES if t[2] == BOB_ID]}")
print(f"    logs:      {[l[0] for l in LOGS if l[2] == BOB_ID]}")
