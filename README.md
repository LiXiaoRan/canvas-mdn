# canvas 笔记

 ## \<canvas> 元素

 ```html
 <canvas id="tutorial" width="150" height="150"></canvas>
 ```

 \<canvas> 看起来和 \<img> 元素很相像，唯一的不同就是它并没有 src 和 alt 属性。实际上，\<canvas> 标签只有两个属性—— width和height。这些都是可选的，并且同样利用 DOM properties 来设置。***当没有设置宽度和高度的时候，canvas会初始化宽度为300像素和高度为150像素***。**该元素可以使用CSS来定义大小，但在绘制时图像会伸缩以适应它的框架尺寸：如果CSS的尺寸与初始画布的比例不一致，它会出现扭曲**。
 > 注意: 如果你绘制出来的图像是扭曲的, 尝试用width和height属性为\<canvas>明确规定宽高，而不是使用CSS。
 元素可以像任何一个普通的图像一样（有margin，border，background等等属性）被设计。然而，这些样式不会影响在canvas中的实际图像。我们将会在一个专门的章节里看到这是如何解决的。当开始时没有为canvas规定样式规则，其将会完全透明。

