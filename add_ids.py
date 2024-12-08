import json

# Read the file as text first to preserve exact formatting
with open('data/golden-globes.json', 'r', encoding='utf-8') as f:
    content = f.read()

# Parse the JSON
data = json.loads(content)

# Create a backup just in case
with open('data/golden-globes.backup.json', 'w', encoding='utf-8') as f:
    f.write(content)

# Convert the content to lines for manual processing
lines = content.split('\n')
result_lines = []
current_id = 1

for line in lines:
    # Add id right after the opening bracket of each object
    if line.strip() == '{':
        result_lines.append(line)
        result_lines.append('  "id": {},'.format(current_id))
        current_id += 1
    else:
        result_lines.append(line)

# Write the modified content
with open('data/golden-globes.json', 'w', encoding='utf-8') as f:
    f.write('\n'.join(result_lines))