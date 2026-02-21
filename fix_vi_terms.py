import os
import re

DATA_DIR = r"E:\Drive\Antigravitiy\Orchesta assistant\06_Gamification_Tech\cost_of_success\data"

# Dictionary of corrections mapping incorrect/inconsistent translations to standard ones
CORRECTIONS = {
    # Overhead
    r'Chi phí chung cố định': 'Định phí sản xuất chung',
    r'chi phí chung cố định': 'định phí sản xuất chung',
    r'Chi phí chung biến đổi': 'Biến phí sản xuất chung',
    r'chi phí chung biến đổi': 'biến phí sản xuất chung',
    r'Chi phí chung': 'Chi phí sản xuất chung',
    r'chi phí chung': 'chi phí sản xuất chung',
    
    # Residual Income / ROI
    r'Lợi nhuận còn sót lại': 'Lợi nhuận thặng dư (RI)',
    r'lợi nhuận còn sót lại': 'lợi nhuận thặng dư',
    r'Lợi nhuận còn lại': 'Lợi nhuận thặng dư (RI)',
    r'lợi nhuận còn lại': 'lợi nhuận thặng dư',
    
    # Break-Even
    r'Điểm hòa vốn': 'Điểm hòa vốn (Break-Even)',
    
    # Margin of Safety
    r'Biên độ an toàn': 'Biên độ an toàn (Margin of Safety)',
    
    # Relevant Cost
    r'Chi phí liên quan': 'Chi phí thích hợp (Relevant Cost)',
    r'chi phí liên quan': 'chi phí thích hợp (Relevant Cost)',
    
    # Variances
    r'Sự khác biệt': 'Biến động (Variance)',
    r'sự khác biệt': 'biến động',
    r'Sự biến động': 'Biến động',
    r'sự biến động': 'biến động',
}

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    
    # Only replace inside the VI block if possible, or just globally since English won't match Vietnamese text
    for old, new in CORRECTIONS.items():
        # Avoid double replacing if already appended e.g. "Chi phí thích hợp (Relevant Cost) (Relevant Cost)"
        if new not in content:
            content = re.sub(old, new, content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

modified_count = 0
for filename in os.listdir(DATA_DIR):
    if filename.endswith(".ts"):
        filepath = os.path.join(DATA_DIR, filename)
        if process_file(filepath):
            modified_count += 1
            print(f"Updated {filename}")

print(f"Total files updated: {modified_count}")
