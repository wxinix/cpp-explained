# C++20 `constexpr` math functions

In C++20, many math functions from the `<cmath>` library were made `constexpr`. This enables complex mathematical operations at compile time, which can lead to more efficient and optimized code.

The main advantage of using `constexpr` math functions is that they enable calculations at compile time rather than at runtime. This can lead to performance improvements because the compiler can optimize the code based on the known constant values. Additionally, because the values are known at compile time, they can be used in places where a constant expression is needed, such as in array sizes and template arguments.

Here are some important points to remember about `constexpr` math functions:

1. Only a subset of math functions from the `<cmath>` library are `constexpr` in C++20. Other functions may still be evaluated at runtime.

2. The arguments provided to a `constexpr` function must be constant expressions themselves. Otherwise, the function call will not be evaluated at compile time.

3. `constexpr` math functions are subject to the same floating-point rounding and accuracy limitations as their runtime counterparts. In other words, you should be aware of potential floating-point inaccuracies when using `constexpr` functions in calculations.

4. Some compilers may not yet fully support C++20 or all of its `constexpr` math functions. Be sure to check the documentation of the compiler being used to ensure that it supports the specific functions.


Here is a list of selected math functions that became `constexpr` in C++20. Note that this list is not exhaustive, but it covers some of the most commonly used functions. Once again, these functions became `constexpr` in C++20, not C++17.


Here's the table sorted by function name in ascending order:

| Function        | Description                                           | Since |
|-----------------|-------------------------------------------------------|-------|
| `abs`             | Absolute value                                        | C++20 |
| `acos`            | Arc cosine function                                   | C++20 |
| `acosh`           | Inverse hyperbolic cosine function                    | C++20 |
| `asin`            | Arc sine function                                     | C++20 |
| `asinh`           | Inverse hyperbolic sine function                      | C++20 |
| `atan`            | Arc tangent function                                  | C++20 |
| `atan2`           | Arc tangent function with two parameters              | C++20 |
| `atanh`           | Inverse hyperbolic tangent function                   | C++20 |
| `cbrt`            | Cube root                                             | C++20 |
| `ceil`            | Ceiling function                                      | C++20 |
| `copysign`        | Copy sign of a number                                 | C++20 |
| `cos`             | Cosine function                                       | C++20 |
| `cosh`            | Hyperbolic cosine function                            | C++20 |
| `div`             | Integral division                                     | C++20 |
| `drem`            | Deprecated; use remainder instead                     | C++20 |
| `erf`             | Error function                                        | C++20 |
| `erfc`            | Complementary error function                          | C++20 |
| `exp`             | Exponential function                                  | C++20 |
| `exp2`            | Base-2 exponential function                           | C++20 |
| `expm1`           | Exponential function minus 1                          | C++20 |
| `fdim`            | Positive difference                                   | C++20 |
| `floor`           | Floor function                                        | C++20 |
| `fma`             | Fused multiply-add                                    | C++20 |
| `fmax`            | Maximum of two floating-point values                  | C++20 |
| `fmin`            | Minimum of two floating-point values                  | C++20 |
| `fmod`            | Floating-point remainder (modulo)                     | C++20 |
| `frexp`           | Break floating-point number into fraction             | C++20 |
| `gamma`           | Deprecated; use tgamma instead                        | C++20 |
| `gamma_r`         | Deprecated; use lgamma instead                        | C++20 |
| `hypot`           | Hypotenuse                                            | C++20 |
| `ilogb`           | Integral logarithm of exponent base-2                 | C++20 |
| `j0`              | Bessel function of the first kind of order 0          | C++20 |
| `j1`              | Bessel function of the first kind of order 1          | C++20 |
| `jn`              | Bessel function of the first kind of order n          | C++20 |
| `ldexp`           | Multiply by integral power of 2                       | C++20 |
| `lgamma`          | Natural logarithm of the absolute value of the gamma function | C++20 |
| `llrint`          | Round to long long integral value                     | C++20 |
| `llround`         | Round to nearest long long integer                    | C++20 |
| `log`             | Natural logarithm                                     | C++20 |
| `log10`           | Base-10 logarithm                                     | C++20 |
| `log1p`           | Natural logarithm of 1 plus argument                  | C++20 |
| `log2`            | Base-2 logarithm                                      | C++20 |
| `logb`            | Base-2 logarithm of exponent                          | C++20 |
| `lrint`           | Round to long integral value                          | C++20 |
| `lround`          | Round to nearest long integer                         | C++20 |
| `max`             | Maximum of two values                                 | C++20 |
| `min`             | Minimum of two values                                 | C++20 |
| `modf`            | Decompose a floating-point number into its integer and fractional parts | C++20 |
| `nan`             | Generate quiet NaN                                    | C++20 |
| `nearbyint`       | Round to integral value in current rounding mode      | C++20 |
| `nextafter`       | Next representable floating-point value               | C++20 |
| `nexttoward`      | Next representable floating-point value toward a long double | C++20 |
| `pow`             | Power function | C++20 |
| `remainder`       | Remainder of the floating-point division              | C++20 |
| `remquo`          | Remainder and quotient of the floating-point division | C++20 |
| `rint`            | Round to integral value                               | C++20 |
| `round`           | Round to nearest integer                              | C++20 |
| `scalb`           | Deprecated; use scalbn or scalbln instead             | C++20 |
| `scalbln`         | Scale floating-point number by a power of FLT_RADIX as a long integer | C++20 |
| `scalbn`          | Scale floating-point number by a power of FLT_RADIX   | C++20 |
| `significand`     | Get the significand of a floating-point number        | C++20 |
| `sin`             | Sine function                                         | C++20 |
| `sinh`            | Hyperbolic sine function                              | C++20 |
| `sqrt`            | Square root                                           | C++20 |
| `tan`             | Tangent function                                      | C++20 |
| `tanh`            | Hyperbolic tangent function                           | C++20 |
| `tgamma`          | Gamma function                                        | C++20 |
| `trunc`           | Truncate function                                     | C++20 |
| `y0`              | Bessel function of the second kind of order 0         | C++20 |
| `y1`              | Bessel function of the second kind of order 1         | C++20 |
| `yn`              | Bessel function of the second kind of order n         | C++20 |


