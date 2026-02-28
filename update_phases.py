import os
import re

phases_dir = r'e:/Drive/Antigravitiy/Orchesta assistant/06_Gamification_Tech/cost_of_success/phases/'

def update_phase_file(content):
    pattern = re.compile(r'(choices=\{currentNode\.choices\?\.map\(c => \(\{)([\s\S]*?)(\}\)\)\})')
    match = pattern.search(content)
    if not match:
        return content, False
    
    header = match.group(1)
    body = match.group(2)
    footer = match.group(3)
    
    changed = False
    
    if 'text: c.text' not in body:
        body = "            text: c.text,\n" + body
        changed = True
        
    if 'onClick:' not in body:
         body += "            onClick: () => handleChoice(c.nextId, c.action),\n"
         changed = True
         
    if 'consequences: c.consequences' not in body:
        body = body.strip().rstrip(',') + ",\n            consequences: c.consequences"
        changed = True
        
    if 'requiredBudget: c.requiredBudget' not in body:
        body = body.strip().rstrip(',') + ",\n            requiredBudget: c.requiredBudget"
        changed = True

    new_body = "\n" + "\n".join([line.strip() for line in body.split('\n') if line.strip()]) + "\n          "
    
    return pattern.sub(f"{header}{new_body}{footer}", content), changed

updated_count = 0
for filename in os.listdir(phases_dir):
    if filename.startswith('Phase') and filename.endswith('.tsx'):
        filepath = os.path.join(phases_dir, filename)
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content, changed = update_phase_file(content)
            if changed:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {filename}")
                updated_count += 1
            else:
                print(f"No changes for {filename}")
        except Exception as e:
            print(f"Error updating {filename}: {e}")

print(f"Total files updated: {updated_count}")
