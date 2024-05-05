import hashlib

def sha256(input_string):
    result = hashlib.sha256(input_string.encode())
    return result.hexdigest()

def find_original_seed(round_no, result_cipher):
    for i in range(1000000000):
        seed_cipher = sha256(str(i).zfill(10))
        if seed_cipher == result_cipher:
            return i

def main():
    round_no = 60981935874249856 
    result_cipher = "f10151ad86b541b3c8a71a527b02ce001a16b02278c83b19827fdbd8304987a9"

    original_seed = find_original_seed(round_no, result_cipher)
    print(f"The original seed is: {original_seed}")

if __name__ == "__main__":
    main()
