# build_script.py

import json
import boto3
import os

def main():
    try:
        # Read Requirements.txt to get required packages
        required_packages = set()
        with open('Requirements.txt', 'r') as f:
            for line in f:
                required_packages.add(line.strip())

        # Load licenses.json data
        with open('licenses.json', 'r') as f:
            licenses_data = json.load(f)

        # Filter licenses.json based on required packages
        filtered_licenses = [pkg for pkg in licenses_data if pkg.get('Name') in required_packages]

        # Write filtered data to filtered_licenses.json
        with open('filtered_licenses.json', 'w') as f:
            json.dump(filtered_licenses, f, indent=2)

        # Upload filtered_licenses.json to S3 bucket
        s3 = boto3.client('s3')
        bucket_name = os.getenv('S3_BUCKET_NAME')
        with open('filtered_licenses.json', 'rb') as data:
            s3.upload_fileobj(data, bucket_name, 'filtered_licenses.json')

        print("Script execution completed successfully.")

    except Exception as e:
        print(f"Error during script execution: {str(e)}")
        raise

if __name__ == "__main__":
    main()
