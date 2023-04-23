# Compile Time Evaluation

In C++, compile-time evaluation refers to the ability to evaluate expressions and perform computations at compile-time, rather than at runtime. This can be achieved using keywords such as `constexpr`, `consteval`, and `constinit`.

| Keyword   | Introduced in | Usage |
|-----------|---------------|-------|
| `constinit` | C++20 | Defines objects that are guaranteed to be initialized with a constant expression. |
| `constexpr` | C++11 | Indicates that a function or object can be evaluated at compile-time. |
| `consteval` | C++20 | Similar to `constexpr`, but functions marked with `consteval` must be evaluated at compile-time. |

In addition to these keywords, C++ also includes several other features that enable compile-time evaluation, such as template metaprogramming and the `std::integral_constant` class template. These features allow for complex computations and logic to be performed at compile-time, leading to more efficient and optimized code.

## Performance boost with compile time evaluation

The ability to perform compile-time evaluation is an important part of the C++ language, as it enables developers to create more efficient and optimized code. The C++ standard includes a number of requirements and guidelines for how these features should be implemented and used. These guidelines help ensure that code that uses compile-time evaluation is portable and can be used across different platforms and architectures.

Compile-time evaluation can help performance in several ways:

1. Reduce runtime overhead: When values or expressions are evaluated at compile time, the resulting code can be optimized by the compiler. This can reduce the amount of runtime overhead that would be incurred if the same calculations were performed at runtime.

2. Eliminate runtime errors: By evaluating values or expressions at compile time, potential runtime errors can be caught and eliminated before the program is even executed. This can help improve the stability and reliability of the program.

3. Enable constant propagation: When values are known at compile time, they can be propagated throughout the code as constants. This can eliminate unnecessary memory accesses and reduce the number of instructions that need to be executed, leading to faster program execution.

4. Allow for more aggressive optimization: By providing the compiler with information about values and expressions at compile time, the compiler can perform more aggressive optimizations, such as `loop unrolling`, instruction scheduling, and register allocation. These optimizations can improve program performance by reducing the number of instructions that need to be executed and by maximizing the use of hardware resources.

## A real-life sample
The following shows a picture of NEMA-TS2 16-channel Malfunction Management Unit (MMU). Credit: [Rob Klug](https://www.flickr.com/photos/robklug/5617557645/)

![Image](mmucard.jpg)

> A Malfunction Management Unit (MMU) is a device utilized in the traffic signal control industry to detect conflicts that may arise when conflicting traffic flows are given right of way simultaneously. This is achieved through the use of a soldering board at the hardware level, which defines the compatibility of each pair of different channels. Essentially, each channel is physically connected to the signal head in the field through load switches, and the compatibility between the channels is relayed to the MMU through this hardware board.

The following illustrates an application of C++ compile time evaluation approach. It is part of the open source C++ [Virtual Traffic Cabinet Framework (VTC)](https://github.com/Caliper-Corporation/TsmAPIsExamples/tree/main/HILS/vtc). VTC framework is developed using modern C++ 20.

The code provides O(1) complexity for returning the start position of a given channel. Note the template functions have zero runtime overhead, while all searching are done at compile time. Apart from the performance benefits, the implementation is concise and generic for any sizable current or future evoluation of MMU compatibility cards.

```cpp
/*!
 * The size of channel compatibility set. For example, for Channel 1 of MMU16,
 * its compatibility set includes 1-2, 1-3, 1-4, ..., 1-16, thus the size is 15.
 * @tparam Channel - The given MMU chanel.
 * @tparam MaxChannel - Max number of channels the MMU supports.
 * @return The size of the compatibility set of the given channel.
 */
template<size_t Channel, size_t MaxChannel> requires ((Channel >= 1) && (Channel <= MaxChannel))
constexpr size_t ChannelSegmentSize()
{
  return (MaxChannel - Channel);
}

/*!
 * The start position (0-based) for the given MMU channel in the fixed-size MMU channel compatibility byte array.
 * @tparam Channel - The given MMU channel.
 * @tparam MaxChannel - Max number of channels the MMU supports.
 * @return The start position (0-based) for the given MMU channel.
 * @remarks MMU channel compatibility is represented by a fixed-size byte array, for
 * MMU16, the byte array has 120 bytes. Each channel has a start position and total number of relevant
 * bytes in the stream describing the channel's compatibility.
 */
template<size_t Channel, size_t MaxChannel = 16> requires ((Channel >= 1) && (Channel <= MaxChannel))
constexpr size_t ChannelSegmentStartPos()
{
  if constexpr (Channel == 1) {
    return 0;
  } else if constexpr (Channel == 2) {
    return ChannelSegmentSize<1, MaxChannel>();
  } else {
    return ChannelSegmentSize<Channel - 1, MaxChannel>() + ChannelSegmentStartPos<Channel - 1>();
  }
}
```

