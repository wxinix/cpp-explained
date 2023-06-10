# std::is_constant_evaluated

`std::is_constant_evaluated` function was introduced in C++20 as a standard library feature. It provides a way to check whether a function is being evaluated in a constant expression context or a non-constant expression context. This feature enables developers to write code that behaves differently during compile-time evaluation compared to runtime execution. 

> The motivation behind introducing `std::is_constant_evaluated` is to allow for explicit compile-time evaluation, which provides more control and flexibility in code execution. It allows developers to optimize certain operations or choose alternate code paths specifically for constant expressions.

Here's an example that demonstrates the usage of `std::is_constant_evaluated`:

```cpp
#include <iostream>

void printEvaluationContext() {
    if (std::is_constant_evaluated()) {
        std::cout << "Constant expression evaluation" << std::endl;
    } else {
        std::cout << "Runtime execution" << std::endl;
    }
}

constexpr int doubleValue(int value) {
    if (std::is_constant_evaluated()) {
        return value * 2;  // Constant expression evaluation
    } else {
        std::cout << "Runtime evaluation" << std::endl;
        return value;      // Runtime execution
    }
}

int main() {
    printEvaluationContext();

    constexpr int result1 = doubleValue(10);
    std::cout << "Result 1: " << result1 << std::endl;

    int value = 20;
    int result2 = doubleValue(value);
    std::cout << "Result 2: " << result2 << std::endl;

    return 0;
}
