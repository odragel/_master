const navLink = document.querySelectorAll('.nav-link');
navLink.forEach((cur)=> cur.addEventListener('click', showSelectedMenu));

function showSelectedMenu(e){
    console.log("showSelectedMenu");
    let visibleMenu = document.querySelector('.visible-menu');
    if(visibleMenu){
        visibleMenu.classList.remove('visible-menu');
    }
    const curTarget = e.currentTarget;
    e.preventDefault();

    const parentLi = curTarget.parentElement;
    const parentUl = parentLi.parentElement;

    let index = Array.prototype.indexOf.call(parentUl.children, parentLi);
    parentUl.children[index+1].classList.add('visible-menu');
}

