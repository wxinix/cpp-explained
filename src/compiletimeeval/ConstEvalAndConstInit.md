# `consteval` and `constinit`

## `consteval`

`consteval` keyword was introduced in C++20 as a new kind of function declaration known as a "consteval function." A consteval function is designed to be evaluated (and must be evaluable) at compile-time within constant expressions.

To be valid, a consteval function must have a literal type, meaning that its type can be used within a constant expression. Additionally, the body of a consteval function must be fully evaluated at compile-time, without any runtime execution. **If these requirements are not met, the compiler will generate an error**.

Here's an example of a consteval function:

```cpp
consteval int square(int x) {
    return x * x;
}
```

### Difference between `consteval` and `constexpr`

```cpp
constexpr int add(int x, int y) {
    return x + y;
}

consteval int multiply(int x, int y) {
    return x * y;
}

int main() {
    constexpr int result1 = add(3, 4);        // Evaluates at compile-time
    consteval int result2 = multiply(5, 6);   // Evaluates at compile-time

    int x = 2, y = 3;
    int result3 = add(x, y);                  // Evaluates at runtime

    return 0;
}
```

In the code above, the `add` function is declared as `constexpr`, allowing it to be evaluated at both compile-time and runtime. The `multiply` function is declared as `consteval`, ensuring that it is evaluated strictly at compile-time within constant expressions.

## `constinit`

The "static initialization order fiasco" in C++ refers to potential issues that can arise when static objects defined in different translation units rely on each other's initialization. When such dependencies exist, the order in which the static objects are initialized is not guaranteed, leading to undefined behavior.

The `constinit` specifier ensures that an object is initialized at compile-time or at dynamic initialization phase, with the guarantee that all `constinit`-qualified objects within a translation unit are initialized before any non-`constinit`-qualified objects.

