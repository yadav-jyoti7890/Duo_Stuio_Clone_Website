
function into(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}

into();

let cursor = document.querySelector('.cursor')
let main = document.querySelector('#main');
let video = document.querySelector('video')
video.addEventListener('mouseenter', function(dets){
   cursor.style.height = '15px'
   cursor.style.width = '80px'
   cursor.style.borderRadius = '5%'
   cursor.style.backgroundColor = '#fff'
   cursor.style.color = '#000'
   cursor.innerHTML = 'sound on'
  
})

video.addEventListener('mouseleave', function(dets){
    cursor.style.height = '20px',
    cursor.style.width = '20px',
    cursor.style.borderRadius = '50%'
    cursor.style.backgroundColor = '#ca1d1d'
    cursor.style.zIndex = '9'
    cursor.style.transition = 'left linear 0.1 top linear 0.1'
    cursor.innerHTML = ''
 })

document.addEventListener('mousemove', function(dets){
    gsap.to(cursor,{
       top:dets.y+20,
       left:dets.x+20
    })
})

  

let tl = gsap.timeline({
    scrollTrigger:{
        trigger:'#page1 h1',
        scroller:'#main',
        // markers:true,
        scrub:true,
        start:'top 30%',
        end:'top 0'
     }
})

tl.to('#page1 h1',{
    x:-100,
  
},"anim")
    tl.to('#page1 h2',{
    x:100,
  
},"anim")
tl.to('#page1 video',{
  width:"90%"
},"anim")

let tl2 = gsap.timeline({
    scrollTrigger:{
        trigger:'#page1 h1',
        scroller:'#main',
        // markers:true,
        start:'top -126%',
        end:'top -130%',
        scrub:true
    }
})

tl2.to('#main',{
    backgroundColor:"#fff"
})

let tl3 =  gsap.timeline({
    scrollTrigger:{
        trigger:'#page1 h1',
        scroller:'#main',
        // markers:true,
        start:'top -350%',
        end:'top -380%',
        scrub:true
    }
})

tl3.to('#main',{
    backgroundColor:'#000',
})

let box = document.querySelectorAll('.box');
box.forEach(function(boxes){
    boxes.addEventListener('mouseenter', function(){
       let box_img =  boxes.getAttribute('box-img')
       console.log(box_img)
       cursor.style.width = '300px'
       cursor.style.height = '250px'
       cursor.style.borderRadius = '0'
       cursor.style.backgroundImage = `url(${box_img})`
        cursor.style.borderRadius = '5px'
    //    cursor.style.objectFit = 'contain'
    //    cursor.style.zIndex = '100'
    })
    boxes.addEventListener('mouseleave', function(){
        boxes.style.backgroundColor = 'transparent';
        cursor.style.height = '20px',
        cursor.style.width = '20px',
        cursor.style.borderRadius = '50%'
      cursor.style.backgroundImage = 'none'
    })
})

// let home = document.querySelector('#home')
// let purple = document.querySelector('#purple')
// home.addEventListener('mouseenter', function(){
//     purple.innerHTML = `<marquee>
//                            <h1>Home</h1>
//                            <h1>Home</h1>
//                            <h1>Home</h1>
//                            <h1>Home</h1>
//                         </marquee>`
//     purple.style.display = "block"
// })
