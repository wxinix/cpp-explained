In C++17, lambda expressions can be used as `constexpr` by default, meaning they can be evaluated at compile-time. This feature enables developers to perform computations at compile-time, reducing runtime overhead and improving performance in certain cases. It can also make the code more readable and easier to understand.

Lambda expressions are anonymous functions that can be defined and used within code. They have the following general syntax:
```cpp
[capture](parameters) -> return_type { function_body }
```

## Using lambda as `constexpr` in C++17:

Since C++17, lambdas are implicitly `constexpr` by default, which means they can be used in constant expressions, as long as the lambda body and its captures are constexpr-compatible. Here's an example to illustrate this:

```cpp
#include <iostream>

int main() {
    constexpr auto square = [](int x) {
        return x * x;
    };

    constexpr int result = square(5);
    static_assert(result == 25, "Square of 5 should be 25");

    std::cout << "Square of 5: " << result << std::endl;
    return 0;
}
```

## Benefits of using lambda as `constexpr`

1. **Compile-time computation**: Using `constexpr` lambdas can shift computation from runtime to compile-time, potentially improving performance for computationally expensive operations.

2. **Readability and expressiveness**: By using lambdas, one can write more expressive and readable code, as functions can be defined and used in-place, right where they are needed.

3. **Type inference**: Lambdas can deduce the return type automatically, making the code shorter and easier to understand.

4. **Better optimization**: Since the lambda is evaluated at compile-time, the compiler has more opportunities to optimize the code further.

5. **Enhanced safety**: Using `constexpr` ensures that the lambda can only be used in constant expressions, which can help catch errors early in the development process.

## Runtime degrading

A `constexpr` lambda can degrade into a runtime lambda when it's used in a context that doesn't require a constant expression or when it doesn't meet the requirements for a `constexpr` function. In such cases, the lambda will be evaluated at runtime instead of compile-time.

Here are some conditions that can cause a `constexpr` lambda to degrade into a runtime lambda:

1. Non-`constexpr` parameters or captures: If the lambda captures or accepts non-`constexpr` variables as parameters, the lambda will not be able to be evaluated at compile-time. For example:

```cpp
int non_const_var = 10;
auto lambda = [non_const_var](int x) {
    return x * non_const_var;
};
int result = lambda(5); // This will be evaluated at runtime
```

2. Non-`constexpr` expressions in the lambda body: If the lambda body contains expressions that cannot be evaluated at compile-time, the lambda will not be `constexpr`. For example:

```cpp
#include <iostream>
#include <cmath>

constexpr auto sqrt_lambda = [](double x) {
    return std::sqrt(x); // std::sqrt is not constexpr (prior to C++20)
};

int main() {
    double result = sqrt_lambda(25.0); // This will be evaluated at runtime
    std::cout << "Square root of 25: " << result << std::endl;
    return 0;
}
```

3. Using the lambda in a non-`constexpr` context: Even if the lambda itself is `constexpr`, if it is used in a context that doesn't require a constant expression, it will be evaluated at runtime. For example:

```cpp
constexpr auto square = [](int x) {
    return x * x;
};

int main() {
    int input = 0;
    std::cout << "Enter an integer: ";
    std::cin >> input;

    int result = square(input); // This will be evaluated at runtime
    std::cout << "Square of " << input << ": " << result << std::endl;
    return 0;
}
```

In this example, although the `square` lambda is `constexpr`, it is used with a runtime input value, so it's evaluated at runtime.

When a `constexpr` lambda degrades into a runtime lambda, it doesn't cause any errors or warnings. It simply means that the lambda is evaluated at runtime, and the performance advantages and safety guarantees of a `constexpr` lambda are not achieved.