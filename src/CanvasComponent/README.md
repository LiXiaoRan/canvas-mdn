# Canvas 绘制基本形状
既然我们已经设置了 canvas 环境，我们可以深入了解如何在 canvas 上绘制。到本文的最后，你将学会如何绘制矩形，三角形，直线，圆弧和曲线，变得熟悉这些基本的形状。绘制物体到Canvas前，需掌握路径，我们看看到底怎么做。

## 栅格
如图所示，canvas元素默认被网格所覆盖。通常来说网格中的一个单元相当于canvas元素中的一像素。栅格的起点为左上角（坐标为（0,0））。所有元素的位置都相对于原点定位。所以图中蓝色方形左上角的坐标为距离左边（X轴）x像素，距离上边（Y轴）y像素（坐标为（x,y））
![删格效果图](https://raw.githubusercontent.com/LiXiaoRan/PicGoBed/master/img/20191204110940.png)

## 绘制矩形
不同于 SVG，`<canvas>` **只支持两种形式的图形绘制：矩形和路径**（由一系列点连成的线段）。所有其他类型的图形都是通过一条或者多条路径组合而成的。不过，我们拥有众多路径生成的方法让复杂图形的绘制成为了可能。
首先，我们回到矩形的绘制中。canvas提供了三种方法绘制矩形：

- fillRect(x, y, width, height)
绘制一个填充的矩形
- strokeRect(x, y, width, height)
绘制一个矩形的边框
- clearRect(x, y, width, height)
清除指定矩形区域，让清除部分完全透明。
上面提供的方法之中每一个都包含了相同的参数。x与y指定了在canvas画布上所绘制的矩形的左上角（相对于原点）的坐标。width和height设置矩形的尺寸。
```js
draw(){
    let canvas = this.canvasRef.current;
    if (canvas.getContext){
    let ctx = canvas.getContext('2d');

    ctx.fillRect(25,25,100,100);
    ctx.clearRect(35,35,80,80);
    ctx.strokeRect(45,45,60,60);

    }
  }
```
![效果图](https://raw.githubusercontent.com/LiXiaoRan/PicGoBed/master/img/20191204112008.png)


## 绘制路径
图形的基本元素是路径。路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。一个路径，甚至一个子路径，都是闭合的。使用路径绘制图形需要一些额外的步骤。

1. 首先，你需要创建路径起始点。
2. 然后你使用画图命令去画出路径。
3. 之后你把路径封闭。
4. 一旦路径生成，你就能通过描边或填充路径区域来渲染图形。

以下是所要用到的函数：

- `beginPath()`
新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
- `closePath()`
闭合路径之后图形绘制命令又重新指向到上下文中。
- `stroke()`
通过线条来绘制图形轮廓。
- `fill()`
通过填充路径的内容区域生成实心的图形。
生成路径的第一步叫做beginPath()。本质上，路径是由很多子路径构成，这些子路径都是在一个列表中，所有的子路径（线、弧形、等等）构成图形。而每次这个方法调用之后，列表清空重置，然后我们就可以重新绘制新的图形。

> 注意：当前路径为空，即调用beginPath()之后，或者canvas刚建的时候，第一条路径构造命令通常被视为是moveTo（），无论实际上是什么。出于这个原因，你几乎总是要在设置路径之后专门指定你的起始位置。`和svg的M命令类似`


> 注意：当你调用fill()函数时，所有没有闭合的形状都会自动闭合，所以你不需要调用closePath()函数。但是调用stroke()时不会自动闭合。

## 绘制三角形
```js
if (canvasTriRef) {
            let ctx = canvasTriRef.getContext("2d");

            ctx.beginPath();
            ctx.moveTo(75, 50);
            ctx.lineTo(100, 25);
            ctx.lineTo(100, 75);
            ctx.fill();
        }
```
### 移动笔触
一个非常有用的函数，而这个函数实际上并不能画出任何东西，也是上面所描述的路径列表的一部分，这个函数就是moveTo()。或者你可以想象一下在纸上作业，一支钢笔或者铅笔的笔尖从一个点到另一个点的移动过程。
`moveTo(x, y)`
将笔触移动到指定的坐标x以及y上。
当canvas初始化或者beginPath()调用后，你通常会使用moveTo()函数设置起点。我们也能够使用moveTo()绘制一些不连续的路径。

### 线
绘制直线，需要用到的方法lineTo()。

`lineTo(x, y)`
绘制一条从当前位置到指定x以及y位置的直线。
该方法有两个参数：x以及y ，代表坐标系中直线结束的点。开始点和之前的绘制路径有关，之前路径的结束点就是接下来的开始点，等等。。。开始点也可以通过moveTo()函数改变。

### 圆弧
绘制圆弧或者圆，我们使用arc()方法。当然可以使用arcTo()，不过这个的实现并不是那么的可靠，所以我们这里不作介绍。

- `arc(x, y, radius, startAngle, endAngle, anticlockwise)`
画一个以（x,y）为圆心的以radius为半径的圆弧（圆），从startAngle开始到endAngle结束，按照- anticlockwise给定的方向（默认为顺时针）来生成。
- `arcTo(x1, y1, x2, y2, radius)`
根据给定的控制点和半径画一段圆弧，再以直线连接两个控制点。

> 注意：arc()函数中表示角的单位是弧度，不是角度。角度与弧度的js表达式:
弧度=`(Math.PI/180)*角度`。

## 二次贝塞尔曲线及三次贝塞尔曲线

- `quadraticCurveTo(cp1x, cp1y, x, y)`
绘制二次贝塞尔曲线，cp1x,cp1y为一个控制点，x,y为结束点。

- `bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`
绘制三次贝塞尔曲线，cp1x,cp1y为控制点一，cp2x,cp2y为控制点二，x,y为结束点。


## Path2D 对象
正如我们在前面例子中看到的，你可以使用一系列的路径和绘画命令来把对象“画”在画布上。为了简化代码和提高性能，Path2D对象已可以在较新版本的浏览器中使用，用来缓存或记录绘画命令，这样你将能快速地回顾路径。

```js
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');

    var rectangle = new Path2D();
    rectangle.rect(10, 10, 50, 50);

    var circle = new Path2D();
    circle.moveTo(125, 35);
    circle.arc(100, 35, 25, 0, 2 * Math.PI);

    ctx.stroke(rectangle);
    ctx.fill(circle);
  }
}

```
在这个例子中，我们创造了一个矩形和一个圆。它们都被存为Path2D对象，后面再派上用场。随着新的Path2D API产生，几种方法也相应地被更新来使用Path2D对象而不是当前路径。在这里，带路径参数的stroke和fill可以把对象画在画布上。

## 使用 SVG paths
新的Path2D API有另一个强大的特点，就是使用SVG path data来初始化canvas上的路径。这将使你获取路径时可以以SVG或canvas的方式来重用它们。

这条路径将先移动到点 (M10 10) 然后再水平移动80个单位(h 80)，然后下移80个单位 (v 80)，接着左移80个单位 (h -80)，再回到起点处 (z)。你可以在Path2D constructor 查看这个例子。
```js
var p = new Path2D("M10 10 h 80 v 80 h -80 Z");
```


# 色彩 Colors
到目前为止，我们只看到过绘制内容的方法。如果我们想要给图形上色，有两个重要的属性可以做到：fillStyle 和 strokeStyle。

- fillStyle = color
设置图形的填充颜色。
- strokeStyle = color
设置图形轮廓的颜色。

合法的写法
```js
// 这些 fillStyle 的值均为 '橙色'
ctx.fillStyle = "orange";
ctx.fillStyle = "#FFA500";
ctx.fillStyle = "rgb(255,165,0)";
ctx.fillStyle = "rgba(255,165,0,1)";
```

```js
 drawFillStyle(canvas) {
        let ctx = this.getCtx(canvas);
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 6; j++) {
                ctx.fillStyle = `rgb(${Math.floor(255 - 42.5 * i)},${Math.floor(
                    255 - 42.5 * j
                )},0)`;

                ctx.fillRect(j * 25, i * 25, 25, 25);
            }
        }
    }
```
效果图：
![](https://raw.githubusercontent.com/LiXiaoRan/PicGoBed/master/img/20191204185909.png)

> ref 注意
``` js
ref={ele => (this.canvasPath2dRef = ele)} 
```
这种方案绑定的ref，不用在jsx中使用`this.canvasPath2dRef.current`获取dom，可以直接通过`this.canvasPath2dRef`获取dom。

### rgba模式
// 指定透明颜色，用于描边和填充样式
```js
ctx.strokeStyle = "rgba(255,0,0,0.5)";
ctx.fillStyle = "rgba(255,0,0,0.5)";
```

## 线型 Line styles
可以通过一系列属性来设置线的样式。

- lineWidth = value
设置线条宽度。
- lineCap = type
设置线条末端样式。
- lineJoin = type
设定线条与线条间接合处的样式。
- miterLimit = value
限制当两条线相交时交接处最大长度；所谓交接处长度（斜接长度）是指线条交接处内角顶点到外角顶点的长度。
- getLineDash()
返回一个包含当前虚线样式，长度为非负偶数的数组。
- setLineDash(segments)
设置当前虚线样式。
- tlineDashOffset = value
设置虚线样式的起始偏移量。

![](https://raw.githubusercontent.com/LiXiaoRan/PicGoBed/master/img/20191204203013.png)

> 注意 如果你想要绘制一条从 (3,1) 到 (3,5)，宽度是 1.0 的线条，你会得到像第二幅图一样的结果。实际填充区域（深蓝色部分）仅仅延伸至路径两旁各一半像素。而这半个像素又会以近似的方式进行渲染，这意味着那些像素只是部分着色，结果就是以实际笔触颜色一半色调的颜色来填充整个区域（浅蓝和深蓝的部分）。这就是上例中为何宽度为 1.0 的线并不准确的原因。
要解决这个问题，你必须对路径施以更加精确的控制。已知粗 1.0 的线条会在路径两边各延伸半像素，那么像第三幅图那样绘制从 (3.5,1) 到 (3.5,5) 的线条，其边缘正好落在像素边界，填充出来就是准确的宽为 1.0 的线条。

>在这个竖线的例子中，其Y坐标刚好落在网格线上，否则端点上同样会出现半渲染的像素点（但还要注意，这种行为的表现取决于当前的lineCap风格，它默认为butt；您可能希望通过将lineCap样式设置为square正方形，来得到与奇数宽度线的半像素坐标相一致的笔画，这样，端点轮廓的外边框将被自动扩展以完全覆盖整个像素格）。

> 还请注意，只有路径的起点和终点受此影响：如果一个路径是通过closePath()来封闭的，它是没有起点和终点的；相反的情况下，路径上的所有端点都与上一个点相连，下一段路径使用当前的lineJoin设置（默认为miter），如果相连路径是水平和/或垂直的话，会导致相连路径的外轮廓根据相交点自动延伸，因此渲染出的路径轮廓会覆盖整个像素格。接下来的两个小节将展示这些额外的行样式。


## lineCap
```js
drawLineCap(canvas) {
        let ctx = this.getCtx(canvas);
        let lineCaps = ["butt", "round", "square"];
        //画基准线
        ctx.beginPath();
        ctx.strokeStyle = "#09f";
        ctx.moveTo(10, 10);
        ctx.lineTo(140, 10);
        ctx.moveTo(10, 140);
        ctx.lineTo(140, 140);
        ctx.stroke();
        ctx.closePath();
        //画线
        ctx.strokeStyle = "#000";
        ctx.lineWidth = "20";
        for (let i = 0; i < lineCaps.length; i++) {
            const linecap = lineCaps[i];
            ctx.beginPath();
            ctx.lineCap = linecap;
            ctx.moveTo(30 + i * 45, 10);
            ctx.lineTo(30 + i * 45, 140);
            ctx.stroke();
            ctx.fillText(linecap, 18 + i * 45, 175);
        }
        ctx.closePath();
    }
```
![](https://raw.githubusercontent.com/LiXiaoRan/PicGoBed/master/img/20191205140644.png)

## lineJoin
lineJoin 的属性值决定了图形中两线段连接处所显示的样子。它可以是这三种之一：round, bevel 和 miter。默认是 miter。

这里我同样用三条折线来做例子，分别设置不同的 lineJoin 值。最上面一条是 round 的效果，边角处被磨圆了，圆的半径等于线宽。中间和最下面一条分别是 bevel 和 miter 的效果。当值是 miter 的时候，线段会在连接处外侧延伸直至交于一点，延伸效果受到下面将要介绍的 miterLimit 属性的制约。

![](https://developer.mozilla.org/@api/deki/files/89/=Canvas_linejoin.png)

## miterLimit
就如上一个例子所见的应用 miter 的效果，线段的外侧边缘会延伸交汇于一点上。线段直接夹角比较大的，交点不会太远，但当夹角减少时，交点距离会呈指数级增大。

miterLimit 属性就是用来设定外延交点与连接点的最大距离，如果交点距离大于此值，连接效果会变成了 bevel。

## 使用虚线
用 `setLineDash` 方法和 `lineDashOffset` 属性来制定虚线样式. `setLineDash` 方法接受一个数组，来指定线段与间隙的交替；`lineDashOffset` 属性设置起始偏移量.

## 渐变 Gradients
渐变 Gradients
就好像一般的绘图软件一样，我们可以用线性或者径向的渐变来填充或描边。我们用下面的方法新建一个 canvasGradient 对象，并且赋给图形的 `fillStyle` 或 `strokeStyle` 属性。

- `createLinearGradient(x1, y1, x2, y2)`
createLinearGradient 方法接受 4 个参数，表示渐变的起点 (x1,y1) 与终点 (x2,y2)。
- `createRadialGradient(x1, y1, r1, x2, y2, r2)`
createRadialGradient 方法接受 6 个参数，前三个定义一个以 (x1,y1) 为原点，半径为 r1 的圆，后三个参数则定义另一个以 (x2,y2) 为原点，半径为 r2 的圆。
```js
var lineargradient = ctx.createLinearGradient(0,0,150,150);
var radialgradient = ctx.createRadialGradient(75,75,0,75,75,100);
```

创建出 canvasGradient 对象后，我们就可以用 addColorStop 方法给它上色了。

- `gradient.addColorStop(position, color)`
addColorStop 方法接受 2 个参数，position 参数必须是一个 0.0 与 1.0 之间的数值，表示渐变中颜色所在的相对位置。例如，0.5 表示颜色会出现在正中间。color 参数必须是一个有效的 CSS 颜色值（如 #FFF， rgba(0,0,0,1)，等等）。
你可以根据需要添加任意多个色标（color stops）。下面是最简单的线性黑白渐变的例子。
```js
var lineargradient = ctx.createLinearGradient(0,0,150,150);
lineargradient.addColorStop(0,'white');
lineargradient.addColorStop(1,'black');
```


## 图案样式 Patterns

- `createPattern(image, type)`
该方法接受两个参数。Image 可以是一个 Image 对象的引用，或者另一个 canvas 对象。Type 必须是下面的字符串值之一：`repeat，repeat-x，repeat-y 和 no-repeat`。

图案的应用跟渐变很类似的，创建出一个 pattern 之后，赋给 fillStyle 或 strokeStyle 属性即可。

```js
var img = new Image();
img.src = 'someimage.png';
var ptrn = ctx.createPattern(img,'repeat');
```

> 注意：与 drawImage 有点不同，你需要确认 image 对象已经装载完毕，否则图案可能效果不对的。

## 阴影 Shadows 
- shadowOffsetX = float
shadowOffsetX 和 shadowOffsetY 用来设定阴影在 X 和 Y 轴的延伸距离，它们是不受变换矩阵所影响的。负值表示阴影会往上或左延伸，正值则表示会往下或右延伸，它们默认都为 0。

- shadowOffsetY = float
shadowOffsetX 和 shadowOffsetY 用来设定阴影在 X 和 Y 轴的延伸距离，它们是不受变换矩阵所影响的。负值表示阴影会往上或左延伸，正值则表示会往下或右延伸，它们默认都为 0。
- shadowBlur = float
shadowBlur 用于设定阴影的模糊程度，其数值并不跟像素数量挂钩，也不受变换矩阵的影响，默认为 0。
- shadowColor = color
shadowColor 是标准的 CSS 颜色值，用于设定阴影颜色效果，默认是全透明的黑色。
> 不受变换矩阵影响

```js
function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');

  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 2;
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
 
  ctx.font = "20px Times New Roman";
  ctx.fillStyle = "Black";
  ctx.fillText("Sample String", 5, 30);
}
```
![shadow效果图](https://raw.githubusercontent.com/LiXiaoRan/PicGoBed/master/img/20191205160021.png)

## 图
canvas更有意思的一项特性就是图像操作能力。可以用于动态的图像合成或者作为图形的背景，以及游戏界面（Sprites）等等。浏览器支持的任意格式的外部图片都可以使用，比如PNG、GIF或者JPEG。 **你甚至可以将同一个页面中其他canvas元素生成的图片作为图片源。**

canvas中引入图像需要两步操作

1. 获得一个指向[`HTMLImageElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement)的对象或者另一个canvas元素的引用作为源，也可以通过提供一个URL的方式来使用图片（参见[例子](http://www.html5canvastutorials.com/tutorials/html5-canvas-images/)）
2. 使用`drawImage()`函数将图片绘制到画布上

##### 由零开始创建图像

或者我们可以用脚本创建一个新的 [`HTMLImageElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement) 对象。要实现这个方法，我们可以使用很方便的`Image()构造函数。`

```js
var img = new Image();   // 创建一个<img>元素
img.src = 'myImage.png'; // 设置图片源地址
```

当脚本执行后，图片开始装载。

若调用 `drawImage` 时，图片没装载完，那什么都不会发生（在一些旧的浏览器中可能会抛出异常）。因此你应该用load事件来保证不会在加载完毕之前使用这个图片：

```js
var img = new Image();   // 创建img元素
img.onload = function(){
  // 执行drawImage语句
}
img.src = 'myImage.png'; // 设置图片源地址
```

**通过 data: url 方式嵌入图像**

我们还可以通过 [data:url](http://en.wikipedia.org/wiki/Data:_URL) 方式来引用图像。Data urls 允许用一串 Base64 编码的字符串的方式来定义一个图片。

```js
img.src = 'data:image/gif;base64,R0lGODlhCwALAIAAAAAA3pn/ZiH5BAEAAAEALAAAAAALAAsAAAIUhA+hkcuO4lmNVindo7qyrIXiGBYAOw==';
```

其优点就是图片内容即时可用，无须再到服务器兜一圈。（还有一个优点是，可以将 CSS，JavaScript，HTML 和 图片全部封装在一起，迁移起来十分方便。）缺点就是图像没法缓存，图片大的话内嵌的 url 数据会相当的长：

###  绘制图片

一旦获得了源图对象，我们就可以使用 `drawImage` 方法将它渲染到 canvas 里。`drawImage` 方法有三种形态，下面是最基础的一种。

- **`drawImage(image, x, y)`**

  其中 `image` 是 image 或者 canvas 对象，`x` 和 `y 是其在目标 canvas 里的起始坐标。`

> SVG图像必须在 <svg> 根指定元素的宽度和高度。

## 缩放 Scaling

`drawImage` 方法的又一变种是增加了两个用于控制图像在 canvas 中缩放的参数。

- [`drawImage(image, x, y, width, height)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage)

  这个方法多了2个参数：`width` 和 `height，`这两个参数用来控制 当向canvas画入时应该缩放的大小

**例子：平铺图像**

在这个例子里，我会用一张图片像背景一样在 canvas 中以重复平铺开来。实现起来也很简单，只需要循环铺开经过缩放的图片即可。见下面的代码，第一层 `for` 循环是做行重复，第二层是做列重复的。图像大小被缩放至原来的三分之一，50x38 px。这种方法可以用来很好的达到背景图案的效果，在下面的教程中会看到。

```js
function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');
  var img = new Image();
  img.onload = function(){
    for (var i=0;i<4;i++){
      for (var j=0;j<3;j++){
        ctx.drawImage(img,j*50,i*38,50,38);
      }
    }
  };
  img.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';
}
```

效果图如下：

![img](https://developer.mozilla.org/@api/deki/files/106/=Canvas_scale_image.png)

## 切片 Slicing

`drawImage` 方法的第三个也是最后一个变种有8个新参数，用于控制做切片显示的。

- [`drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage)

  第一个参数和其它的是相同的，都是一个图像或者另一个 canvas 的引用。其它8个参数最好是参照右边的图解，前4个是定义图像源的切片位置和大小，后4个则是定义切片的目标显示位置和大小。

![img](https://developer.mozilla.org/@api/deki/files/79/=Canvas_drawimage.jpg)

切片是个做图像合成的强大工具。假设有一张包含了所有元素的图像，那么你可以用这个方法来合成一个完整图像。例如，你想画一张图表，而手上有一个包含所有必需的文字的 PNG 文件，那么你可以很轻易的根据实际数据的需要来改变最终显示的图表。这方法的另一个好处就是你不需要单独装载每一个图像。

# 变形 Transformations

## 状态的保存和恢复 Saving and restoring state

在了解变形之前，我先介绍两个在你开始绘制复杂图形时必不可少的方法。

- [`save()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/save)

  保存画布(canvas)的所有状态

- [`restore()`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/restore)

  save 和 restore 方法是用来保存和恢复 canvas 状态的，都没有参数。Canvas 的状态就是当前画面应用的所有样式和变形的一个快照。

Canvas状态存储在栈中，每当`save()`方法被调用后，当前的状态就被推送到栈中保存。一个绘画状态包括：

- 当前应用的变形（即移动，旋转和缩放，见下）
- `strokeStyle`, `fillStyle`, `globalAlpha`, `lineWidth`, `lineCap`, `lineJoin`, `miterLimit`, `shadowOffsetX`, `shadowOffsetY`, `shadowBlur`, `shadowColor`, `globalCompositeOperation 的值`
- 当前的裁切路径（clipping path），会在下一节介绍

你可以调用任意多次 `save `方法。

每一次调用 `restore` 方法，上一个保存的状态就从栈中弹出，所有设定都恢复。

>  **这一点和Android中的canvas一模一样，都是一个栈**

下面来看一个例子

```js
let ctx = this.stref.getContext("2d");

        ctx.fillRect(0, 0, 150, 150); // 使用默认设置绘制一个矩形
        ctx.save(); // 保存默认状态

        ctx.fillStyle = "#09F"; // 在原有配置基础上对颜色做改变
        ctx.fillRect(15, 15, 120, 120); // 使用新的设置绘制一个矩形
        ctx.save();

        ctx.fillStyle = "#fff"; // 再次改变颜色配置
        ctx.globalAlpha = 0.5;
        ctx.fillRect(30, 30, 90, 90); //使用新配置绘制矩形

        ctx.restore(); // 重新加载之前的颜色状态,第二次save代码之前的状态
        ctx.fillRect(45, 45, 60, 60); // 使用上一次的配置绘制一个矩形

        ctx.restore(); // 加载默认颜色配置
        ctx.fillRect(60, 60, 30, 30); // 使用加载的配置绘制一个矩形
```

效果如下：

![](https://raw.githubusercontent.com/LiXiaoRan/PicGoBed/master/img/20191219233318.png)

