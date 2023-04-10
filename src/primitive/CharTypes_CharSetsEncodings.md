# Character Sets and Encodings

## Character set

A character set, also known as a character repertoire, is a collection of characters and symbols that are used to represent written language in computing. Each character in a character set is assigned a unique code point, which is a numerical value that represents that character in digital form.

Character sets can include characters from many different writing systems and languages, such as the Latin alphabet used in English, or the Chinese characters used in Mandarin Chinese. Some character sets are designed for specific languages or scripts, while others are designed to be universal and include characters from many different languages.

Examples of character sets include ASCII, which includes characters commonly used in the English language, and Unicode, which is a universal character set that can represent all characters used in modern computing, including characters from many different writing systems.

### *Code point*

A code point is a numerical value that represents a single character or symbol in a character set. Each character in a character set is assigned a unique code point, which is a specific number that identifies that character.

Code points are typically expressed as hexadecimal numbers, which means that they use a base-16 numbering system. For example, the code point for the letter "A" in the ASCII character set is 0x41, while the code point for the Greek letter "α" in the Unicode character set is 0x03B1.

Unicode comprises 1,114,112 code points in the range [0, 1,114,111]. The maximum value of Unicode code point is 1,114,111 (0x10FFFF).

## Encodings

Encoding involves mapping each code point to a specific sequence of bits or bytes that can be used to represent that character in digital form.

The Unicode standard defines a character set that includes 1,114,111 characters, each with a unique code point, and provides several encoding schemes, including UTF-8, UTF-16, and UTF-32, that allow characters to be represented using variable-length sequences of bytes.

### *UTF-8 encoding*
UTF-8 is a variable-length encoding scheme. It works by mapping each Unicode code point to a sequence of 1 to 4 bytes, depending on the code point value. 

| Code Point Range | Number of Bytes | Binary Format |
| --- | --- | --- |
| 0 to 127 | 1 byte | `0xxx'xxxx` |
| 128 to 2047 | 2 bytes | `110x'xxxx, 10xx'xxxx` |
| 2048 to 65535 | 3 bytes | `111'0xxxx 10x'xxxxx 10xx'xxxx` |
| 65536 to 1114111 | 4 bytes | `1111'0xxx 10xx'xxxx 10xx'xxxx 10xx'xxxx` |

Here's how UTF-8 encoding works:

- If the code point value is between 0 and 127 (inclusive), the code point is represented as a single byte with the same value. This means that ASCII characters (which have code point values between 0 and 127) can be represented in UTF-8 encoding using a single byte.

- If the code point value is between 128 and 2047 (inclusive), the code point is represented as 2 bytes. The first byte starts with the binary value `110`, followed by 5 bits that represent the most significant bits of the code point value. The second byte starts with the binary value `10`, followed by 6 bits that represent the least significant bits of the code point value.

- If the code point value is between 2048 and 65535 (inclusive), the code point is represented as 3 bytes. The first byte starts with the binary value `1110`, followed by 4 bits that represent the most significant bits of the code point value. The second and third bytes start with the binary value `10`, followed by 6 bits each that represent the remaining bits of the code point value.

- If the code point value is between 65536 and 1114111 (inclusive), the code point is represented as 4 bytes. The first byte starts with the binary value `11110`, followed by 3 bits that represent the most significant bits of the code point value. The second, third, and fourth bytes start with the binary value `10`, followed by 6 bits each that represent the remaining bits of the code point value.

By using a variable-length encoding scheme, UTF-8 encoding can represent all Unicode code points using a sequence of 1 to 4 bytes. This allows UTF-8 to be a compact and efficient encoding scheme. UTF-8 is a superset of ASCII and fully compatible with it.

UTF-8 has unique patterns with the first byte, and a fixed pattern with trailing bytes. This allows for easy validation of a correct UTF-8 sequence, quick "scrolling" to a random position and synchronizing quickly where a character will start.

### *UTF-16 encoding*

| Code Point Range | Number of Bytes | Binary Format |
| --- | --- | --- |
| 0 to 65535 | 1 code unit (2 bytes) | `xxxxxxxx xxxxxxxx` |
| 65536 to 1114111 | 2 code units (4 bytes) | `110110yy yyyyyyyy 110111xx xxxxxxxx` |

- For code points in the range of 0 to 65535, UTF-16 encoding represents each code point using a single 16-bit code unit. 
- For code points in the range of 65536 to 1114111, UTF-16 encoding represents each code point using a pair of 16-bit code units, known as a surrogate pair. The first 16-bit code unit (known as the high surrogate) has a value in the range of 0xD800 to 0xDBFF, while the second 16-bit code unit (known as the low surrogate) has a value in the range of 0xDC00 to 0xDFFF.

### *UTF-32 encoding*

| Code Point Range | Number of Code Units | Binary Format |
| --- | --- | --- |
| 0 to 1114111 | 1 code unit (4 bytes) | `00000000 xxxxxxxx xxxxxxxx xxxxxxxx` |


UTF-32 encoding represents each code point using a single 32-bit code unit, which means that every Unicode code point is represented using exactly 4 bytes of memory.

### *Why not UTF-24 encoding*

Although it is theoretically possible to create a fixed-length encoding scheme that uses 3 bytes to represent each Unicode code point, such an encoding scheme would not provide any significant advantages over existing encoding schemes like UTF-8, UTF-16, or UTF-32 in terms of processing or space efficiency. Many software systems and programming languages are optimized for these standard Unicode encoding schemes, making them more convenient and widely supported.

Furthermore, most of the commonly used Unicode code points are smaller than 65536, which means that using three bytes per code point would result in unnecessary wastage of space. Therefore, despite the theoretical possibility of a 3-byte fixed-length encoding scheme, it is not practical to use it in most real-world scenarios.

### *Byte order mark*

The Unicode encoding of a text file can be determined by examining the byte order mark (BOM) at the beginning of the file, or by analyzing the byte sequences of the file.

| Encoding | Byte Order Mark |
| --- | --- |
| UTF-8 | `EF BB BF` (optional) |
| UTF-16 | `FE FF` (big-endian) or `FF FE` (little-endian) |
| UTF-32 | `00 00 FE FF` (big-endian) or `FF FE 00 00` (little-endian) |


## Code page
The legacy term "code page" originated from IBM's EBCDIC-based mainframe systems, but Microsoft, SAP, and Oracle are among the vendors that use this term. The majority of vendors identify their own character sets by a code page name. Originally, the code page numbers referred to the page numbers in the IBM standard character set manual, a condition which has not held for a long time. Vendors that use a code page system allocate their own code page number to a character set and its encoding, even if it is better known by another name; for example, UTF-8 has been assigned page numbers 1208 at IBM, 65001 at Microsoft, and 4110 at SAP. 

The following table lists Windows code pages used by Microsoft in its own Windows operating system.

| Microsoft Code Page     | Code Page Number | Description                                |
|-------------------------|------------------|--------------------------------------------|
| Windows-1252            | 1252             | Western European languages                 |
| Windows-1250            | 1250             | Central and Eastern European languages     |
| Windows-1251            | 1251             | Cyrillic languages                         |
| Windows-1253            | 1253             | Greek language                             |
| Windows-1254            | 1254             | Turkish language                           |
| Windows-1255            | 1255             | Hebrew language                            |
| Windows-1256            | 1256             | Arabic language                            |
| Windows-1257            | 1257             | Baltic languages                           |
| Windows-1258            | 1258             | Vietnamese language                        |
| UTF-8                   | 65001            | 8-bit Unicode                              |
| UTF-16LE                | 1200             | 16-bit Unicode, Little Endian              |
| UTF-16BE                | 1201             | 16-bit Unicode, Big Endian                 |
| UTF-32LE                | 12000            | 32-bit Unicode, Little Endian              |
| UTF-32BE                | 12001            | 32-bit Unicode, Big Endian                 |
| UTF-7                   | 65000            | 7-bit Unicode                              |
| UTF-1                   | 12000            | 8-bit Unicode                              |
| UTF-EBCDIC              | 1200             | EBCDIC-based Unicode                       |
