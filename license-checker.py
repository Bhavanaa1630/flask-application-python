import subprocess

def check_licenses():
    # Read requirements.txt
    with open('requirements.txt', 'r') as f:
        packages = f.read().splitlines()
    
    # Run license-checker command for each package
    results = []
    for package in packages:
        cmd = f'license-checker {package} --json'
        output = subprocess.check_output(cmd, shell=True).decode('utf-8')
        results.append(output)
    
    return results
