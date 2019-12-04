# canvas 笔记

 ## \<canvas> 元素

 ```html
 <canvas id="tutorial" width="150" height="150"></canvas>
 ```

 \<canvas> 看起来和 \<img> 元素很相像，唯一的不同就是它并没有 src 和 alt 属性。实际上，\<canvas> 标签只有两个属性—— width和height。这些都是可选的，并且同样利用 DOM properties 来设置。***当没有设置宽度和高度的时候，canvas会初始化宽度为`300`像素和高度为`150`像素***。**该元素可以使用CSS来定义大小，但在绘制时图像会伸缩以适应它的框架尺寸：如果CSS的尺寸与初始画布的比例不一致，它会出现扭曲**。
 > 注意: 如果你绘制出来的图像是扭曲的, 尝试用width和height属性为\<canvas>明确规定宽高，而不是使用CSS。
 元素可以像任何一个普通的图像一样（有margin，border，background等等属性）被设计。然而，这些样式不会影响在canvas中的实际图像。我们将会在一个专门的章节里看到这是如何解决的。当开始时没有为canvas规定样式规则，其将会完全透明。

### \</canvas> 标签不可省
如果不需要替代内容，一个简单的 `<canvas id="foo" ...></canvas>` 在所有支持canvas的浏览器中都是完全兼容的。

与 `<img>` 元素不同，`<canvas>` 元素需要结束标签(`</canvas>`)。如果结束标签不存在，则文档的其余部分会被认为是替代内容，将不会显示出来。

## 渲染上下文
canvas起初是空白的。为了展示，首先脚本需要找到渲染上下文，然后在它的上面绘制。`<canvas>` 元素有一个叫做 `getContext()` 的方法，这个方法是用来获得渲染上下文和它的绘画功能。`getContext()`只有一个参数，上下文的格式。对于2D图像而言，如本教程，你可以使用 `CanvasRenderingContext2D`。
```js
var canvas = document.getElementById('tutorial');
var ctx = canvas.getContext('2d');
```
代码的第一行通过使用 document.getElementById() 方法来为 \<canvas> 元素得到DOM对象。一旦有了元素对象，你可以通过使用它的getContext() 方法来访问绘画上下文。


## 检查支持性
替换内容是用于在不支持 \<canvas> 标签的浏览器中展示的。通过简单的测试getContext()方法的存在，脚本可以检查编程支持性。上面的代码片段现在变成了这个样子：
```js
var canvas = document.getElementById('tutorial');

if (canvas.getContext){
  var ctx = canvas.getContext('2d');
  // drawing code here
} else {
  // canvas-unsupported code here
}
```

## 目录
- [基本用法](./src/CanvasComponent/README.md)
- [绘制形状](./src/CanvasComponent/README.md)
- [添加样式和颜色](./src/CanvasComponent/README.md)
- [绘制文本](./src/CanvasComponent/README.md)
- [使用图片](./src/CanvasComponent/README.md)
- [变形](./src/CanvasComponent/README.md)
- [合成与裁剪](./src/CanvasComponent/README.md)
- [基本动画](./src/CanvasComponent/README.md)
- [高级动画](./src/CanvasComponent/README.md)
- [像素操作](./src/CanvasComponent/README.md)
- [点击区域和无障碍访问](./src/CanvasComponent/README.md)
- [canvas的优化](./src/CanvasComponent/README.md) 
- [终极](./src/CanvasComponent/README.md)