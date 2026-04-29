import sys
import re

def is_english_or_japanese(text):
    jp_pattern = re.compile(r"[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]")
    return bool(jp_pattern.search(text) or re.match(r'^[a-zA-Z0-9\s\.,!?;:()\'"\-\[\]]+$', text))

if __name__ == "__main__":
    if not is_english_or_japanese(sys.stdin.read()):
        print("Error: Unsupported characters.")
        sys.exit(1)
