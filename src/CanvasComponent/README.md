# Canvas 绘制基本形状
既然我们已经设置了 canvas 环境，我们可以深入了解如何在 canvas 上绘制。到本文的最后，你将学会如何绘制矩形，三角形，直线，圆弧和曲线，变得熟悉这些基本的形状。绘制物体到Canvas前，需掌握路径，我们看看到底怎么做。

## 栅格
如图所示，canvas元素默认被网格所覆盖。通常来说网格中的一个单元相当于canvas元素中的一像素。栅格的起点为左上角（坐标为（0,0））。所有元素的位置都相对于原点定位。所以图中蓝色方形左上角的坐标为距离左边（X轴）x像素，距离上边（Y轴）y像素（坐标为（x,y））
![](https://raw.githubusercontent.com/LiXiaoRan/PicGoBed/master/img/20191204110940.png)

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
![](https://raw.githubusercontent.com/LiXiaoRan/PicGoBed/master/img/20191204112008.png)


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