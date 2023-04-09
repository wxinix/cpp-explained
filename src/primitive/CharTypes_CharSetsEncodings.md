# Character Sets and Encodings

## Character Set

A character set, also known as a character repertoire, is a collection of characters and symbols that are used to represent written language in computing. Each character in a character set is assigned a unique code point, which is a numerical value that represents that character in digital form.

Character sets can include characters from many different writing systems and languages, such as the Latin alphabet used in English, the Cyrillic alphabet used in Russian, or the Chinese characters used in Mandarin Chinese. Some character sets are designed for specific languages or scripts, while others are designed to be universal and include characters from many different languages.

Examples of character sets include ASCII, which includes characters commonly used in the English language, and Unicode, which is a universal character set that can represent all characters used in modern computing, including characters from many different writing systems.

### *Code Point*

A code point is a numerical value that represents a single character or symbol in a character set. Each character in a character set is assigned a unique code point, which is a specific number that identifies that character.

Code points are typically expressed as hexadecimal numbers, which means that they use a base-16 numbering system. For example, the code point for the letter "A" in the ASCII character set is 0x41, while the code point for the Greek letter alpha in the Unicode character set is 0x03B1.

Code points are used to represent characters in digital form and are used by various encoding schemes to represent characters as binary data. Encoding schemes such as UTF-8, UTF-16, and UTF-32 map each code point to a specific sequence of bytes, allowing characters to be stored and transmitted in a digital format.

Unicode comprises 1,114,112 code points in the range [0, 1,114,111].

## Encodings

Encoding involves mapping each code point (i.e., the numerical value that represents a character in a character set) to a specific sequence of bits or bytes that can be used to represent that character in digital form.

Different encoding schemes use different methods for mapping code points to binary sequences. For example, UTF-8 encoding uses a variable-length encoding scheme that can represent each Unicode code point using 1 to 4 bytes, depending on the code point value, while UTF-16 encoding uses a fixed-length encoding scheme that represents each Unicode code point using 2 bytes.

The goal of encoding is to allow characters and symbols to be represented in digital form, which is necessary for storing, transmitting, and processing text data using computer systems.

### *UTF-8 Encoding*
UTF-8 is a variable-length encoding scheme used to represent Unicode characters as binary data. UTF-8 encoding works by mapping each Unicode code point to a sequence of 1 to 4 bytes, depending on the code point value. 

| Code Point Range | Number of Bytes | Binary Format |
| --- | --- | --- |
| 0 to 127 | 1 byte | `0xxx'xxxx` |
| 128 to 2047 | 2 bytes | `110x'xxxx, 10xx'xxxx` |
| 2048 to 65535 | 3 bytes | `111'0xxxx 10x'xxxxx 10xx'xxxx` |
| 65536 to 1114111 | 4 bytes | `1111'0xxx 10xx'xxxx 10xx'xxxx 10xx'xxxx` |


Here's how UTF-8 encoding works:

- If the code point value is between 0 and 127 (inclusive), the code point is represented as a single byte with the same value. This means that ASCII characters (which have code point values between 0 and 127) are represented in UTF-8 encoding using a single byte.

- If the code point value is between 128 and 2047 (inclusive), the code point is represented as 2 bytes. The first byte starts with the binary value `110`, followed by 5 bits that represent the most significant bits of the code point value. The second byte starts with the binary value `10`, followed by 6 bits that represent the least significant bits of the code point value.

- If the code point value is between 2048 and 65535 (inclusive), the code point is represented as 3 bytes. The first byte starts with the binary value `1110`, followed by 4 bits that represent the most significant bits of the code point value. The second and third bytes start with the binary value `10`, followed by 6 bits each that represent the remaining bits of the code point value.

- If the code point value is between 65536 and 1114111 (inclusive), the code point is represented as 4 bytes. The first byte starts with the binary value `11110`, followed by 3 bits that represent the most significant bits of the code point value. The second, third, and fourth bytes start with the binary value `10`, followed by 6 bits each that represent the remaining bits of the code point value.

By using a variable-length encoding scheme, UTF-8 encoding can represent all Unicode code points using a sequence of 1 to 4 bytes. This allows UTF-8 to be a compact and efficient encoding scheme, while still supporting a wide range of characters and symbols from many different writing systems. 

UTF-8 is compatible with ASCII. The advantage of UTF-8 is that the lead bytes are unique patterns, and trailing bytes are a unique pattern, which allows for easy validation of a correct UTF-8 sequence, quick "scrolling" to a random position and synchronizing quickly where a character will start.

### *UTF-16 Encoding*

| Code Point Range | Number of Bytes | Binary Format |
| --- | --- | --- |
| 0 to 65535 | 1 code unit (2 bytes) | `xxxxxxxx xxxxxxxx` |
| 65536 to 1114111 | 2 code units (4 bytes) | `110110yy yyyyyyyy 110111xx xxxxxxxx` |

- For code points in the range of 0 to 65535, UTF-16 encoding represents each code point using a single 16-bit code unit. 
- For code points in the range of 65536 to 1114111, UTF-16 encoding represents each code point using a pair of 16-bit code units, known as a surrogate pair. The first 16-bit code unit (known as the high surrogate) has a value in the range of 0xD800 to 0xDBFF, while the second 16-bit code unit (known as the low surrogate) has a value in the range of 0xDC00 to 0xDFFF.

### *UTF-32 Encoding*

| Code Point Range | Number of Code Units | Binary Format |
| --- | --- | --- |
| 0 to 1114111 | 1 code unit (4 bytes) | `00000000 0000xxxx xxxxxxxx xxxxxxxx` |


UTF-32 encoding represents each code point using a single 32-bit code unit, which means that every Unicode code point is represented using exactly 4 bytes of memory. The binary format for UTF-32 encoding uses the first 12 bits to store zeros, followed by 10 bits that represent the most significant bits of the code point value, and then 10 bits that represent the least significant bits of the code point value.

### *Why Not UTF-24 Encoding*

UTF-24 is not an official Unicode encoding and is not widely used or supported. Three-byte encoding is not commonly used because it does not offer significant advantages over UTF-16 or UTF-32, which are the most widely used Unicode encodings.

While it is theoretically possible to use a fixed-length encoding scheme that uses 3 bytes to represent each Unicode code point, such as in UTF-24 (if it ever exists), this encoding scheme would not offer significant benefits over UTF-8, UTF-16, or UTF-32 in terms of processing or space efficiency. Many software systems and programming languages are optimized for UTF-8, UTF-16, or UTF-32. Additionally, the most commonly used Unicode code points are smaller than 65536, so the use of three bytes per code point would result in wasted space. 

### *Byte Order Mark*

The Unicode encoding of a text file can be determined by examining the byte order mark (BOM) at the beginning of the file, or by analyzing the byte sequences of the file.

| Encoding | Byte Order Mark |
| --- | --- |
| UTF-8 | `EF BB BF` (optional) |
| UTF-16 | `FE FF` (big-endian) or `FF FE` (little-endian) |
| UTF-32 | `00 00 FE FF` (big-endian) or `FF FE 00 00` (little-endian) |


---


The following table summarizes common charset and their respective encodings.

| Character Set | Description | Encodings |
| --- | --- | --- |
| ASCII | A 7-bit character set that includes characters commonly used in the English language, such as letters, numbers, and punctuation. | ASCII, various 8-bit and 16-bit extensions, including ISO 8859 and Unicode |
| ISO-8859 | A series of 8-bit character sets that include characters used in different regions of the world, such as ISO-8859-1 for Western Europe and ISO-8859-5 for Cyrillic languages. | Various, depending on the specific ISO-8859 variant |
| EBCDIC | A family of character encodings used primarily on IBM mainframe systems. | Various, depending on the specific EBCDIC variant |
| JIS | A set of character sets used for Japanese text, including JIS X 0201 for single-byte characters and JIS X 0213 for multi-byte characters. | Shift JIS |
| GB2312 | A character set used for simplified Chinese text. | GBK, GB18030 |
| Unicode | A universal character set that can represent all characters used in modern computing, including characters from many different writing systems. | UTF-8, UTF-16, UTF-32 |
| Big5 | A character set used for traditional Chinese text. | Big5, Big5-HKSCS |
| KOI8 | A series of character sets used for various Cyrillic-based languages. | KOI8-R, KOI8-U, KOI8-T |
| TIS-620 | A character set used for the Thai language. | TIS-620-2533, ISO-8859-11, Windows-874 |
