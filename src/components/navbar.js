import React,{useRef,useState} from "react";
import Logo from "../assets/images/ddblack.png";
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import { aboutImg,menu,Empty   } from "../data";
import Footer from "./footer";


const NavBar =()=>{
    const searchRef=useRef();
 
    function show(){
        document.getElementById("cart").classList.toggle("showCart");
    }

    const searchHandler=()=>{
      
       
        searchRef.current.classList.toggle("active");
       
        
        
        
       

    }
    
    



    return (<>
   <header className="header">
    <img src={Logo} alt="logo"/>
   <nav className="navbar">
    <Link to="/" >Home</Link>
    <Link to="/about" >About</Link>
    <Link to="/menu" >Menu</Link>
    <Link to="/products" >Products</Link>
    <Link to="/review" >Review</Link>
    <Link to="/contact" >Contact</Link>
    <Link to="/blog" >Blog</Link>



        

        </nav>
        <div className="icons">
            <div className="fa fa-search" onClick={searchHandler}></div>
            <div className="fa fa-shopping-cart" id="icnofcart" onClick={show}></div>
            <div className="fa fa-bars" id="menu-btn"></div>
            
        </div>
        <div className="search-form" id="appear" ref={searchRef}>
            <input type="search" placeholder="search here ..." />
            <label htmlFor="search-box" className="fa fa-search" ></label>
        </div>
   </header>
   
    </>)
}


const Home= ()=>{
return (<>
<NavBar/>

<section className="home" id="home">
    <div className="content">
        <h3>Hi, <span>Good Morning Everyone.</span> Enjoy the class</h3>
        <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</p>
        <a href="#home" className="btn">Get the data</a>
    </div>
</section>
 
</>)
}
const About= ()=>{
    return (<>
    <NavBar/>
    
    <section className="about" id="about">
    <h1 className="heading"><span>About</span>Us</h1>
    <div className="row">
    <div className="image"><img src={aboutImg} alt="about_us"></img>
    </div>
    

        <div className="content">
            <h1>What Makes You Best</h1>
    <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</p>
    <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</p>
    <a href="#about" className="btn"> About Us</a>
    </div></div>
    
    </section>
    </>)
    }
    const Menu= ()=>{
        const [total,setTotal]=useState(0);

        const finalTotal=( )=>{
            setTotal(( )=>{
                let tot=0;
                let l=document.getElementById("cart").childNodes.length;
            
                tot=0;
                for(let i=0;i<l;i++){
               
                    if(i>2){
                     let boxes=document.getElementById("cart").children[i];
                     let p=boxes.children[2].value;
                     let q=boxes.children[3].innerHTML;
                     let t="";
                     for(let i in q){
                         if(i>0){
                             t+=q[i];
     
                         }
                     }
                     tot+=Number(t)*p ;
                 
                    
                 
     
                     console.log(p,q);
                    
                    }
                 }
               
               
                
                return tot;
            });
        }


       
        function addToCart (r) {
          document.getElementById("cart").children[1].style.visibility="initial";
          document.getElementById("cart-empty").style.display="none";
            
          
         let div=document.createElement("div");
         
         let imagee=document.createElement("img");
         let paragraph=document.createElement("p");
         let quan=document.createElement("input");
         let head=document.createElement("h4");
         let icn=document.createElement("button");
         let remove=document.createElement("button");
         remove.innerHTML="Remove";
         remove.id=`remove${r}`;
         
        

         icn.className="fa fa-heart";

         head.innerHTML="$"+menu[r]["price"];

         quan.type="number";
         quan.value=1;
          
         quan.setAttribute("min",1);
         

         paragraph.innerText=menu[r]["name"];
         imagee.setAttribute("src",menu[r]["component"]);


         
         div.id=`cartItem${r}`;
         

         div.className='cart-box';
         const boxx=[imagee,paragraph,quan,head,icn,remove];
         if(document.getElementById(`cartItem${r}`)){ document.getElementById(`cartItem${r}`).childNodes[2].value=Number(document.getElementById(`cartItem${r}`).childNodes[2].value)+1}
         else{
       for(let  i=0;i<boxx.length;i++){
        div.appendChild(boxx[i]);

       }
       remove.addEventListener("click",()=>removeCart(r));
       quan.addEventListener("change",()=>finalTotal());
         
          document.getElementById("cart").appendChild(div);

         
         }


         console.log(r);
         finalTotal( );
        
      
            
        }
        function removeCart(k){
            
            let x=document.getElementById(`cartItem${k}`).childNodes[2].value;
            if(x){
                if(x>1){
                    document.getElementById(`cartItem${k}`).childNodes[2].value=Number(x)-1;
                }
                else{
                    document.getElementById("cart").removeChild(document.getElementById(`cartItem${k}`));
                    
                }
            }
            else{
                console.log("No item is present to remove");

            }
           
            if(document.getElementById("cart").childNodes.length===3){
                document.getElementById("cart").children[1].style.visibility="hidden";
                document.getElementById("cart-empty").style.display="block";
             
            }
            finalTotal( );
        }
       
       
        
       
        return (<>
        <NavBar/>
        <section className="menu" id="menu">
            <div className="content"><h1>Our <span>Menu</span></h1></div>
      <div className="columns">
           {menu.map((i,index)=><div className="box"><img src={i["component"]} alt="menu_imgs"></img>
           <h2>{i["name"]}</h2>
           <h3>{"$"+i["price"]} <sub>{ (Number(i["price"])+Number(i["price"]*20/100)).toFixed(2) }</sub></h3>
           <button className="btn"  onClick={()=>addToCart(index)}  >Add To Cart</button>
           </div>)}

          
        
    
      </div>
      
      <div className="cart" id="cart"><h2>Your cart</h2>
      {/*(items)=>items.map((i,index)=>
     
     <div className="cart-box">
   <img src={i["component"]} alt="cartImage"></img>
   <p>{i["name"]}</p>
   <input type="number" min={1}></input>
   <h4>{i["price"]}</h4>
   <button className="fa fa-heart"  ></button>
   <button  >Remove</button>
    
   </div>) */}
   <h3 className="total">Total : <span>{"$"+total.toFixed(2)}</span></h3>
  <div id="cart-empty"> <img src={Empty} alt="cart_empty" id="empty"></img><h1>Whoops... Cart is Empty!</h1>
  <h2>Add Items to checkout...</h2> </div>
   </div>
   
    </section>
   
        </>)
        }

        const Products= ()=>{
            return (<>
            <NavBar/>
            <section className="products"><div className="content"><h1>Our Products</h1>
            <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</p>
    </div></section>
            </>)
            }

            const Review= ()=>{
                return (<>
                <NavBar/>
                <section className="review"><div className="content"><h1>Review</h1>
                <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</p>
    </div></section>
                </>)
                }
                const Contact= ()=>{
                    return (<>
                    <NavBar/>
                    <section className="contact" id="contact"><h1 className="heading"><span>Contact</span></h1>
                    <div className="content">
                    <iframe className="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.875588080509!2d78.51570967368876!3d17.369718603316816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb995b83d1960f%3A0x65ab077d64504e04!2sVivid%20Technologies%20Staffing!5e0!3m2!1sen!2sin!4v1699343117085!5m2!1sen!2sin"  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="location"></iframe>

                        <form>
                            <h3>Get In Touch</h3>
                            <div className="inputBox">
                                <span className="fa fa-user"></span>
                                <input type="text" placeholder="name"></input>
                            </div>
                            <div className="inputBox">
                                <span className="fa fa-envelope"></span>
                                <input type="email" placeholder="email"></input>
                            </div>
                            <div className="inputBox">
                                <span className="fa fa-user"></span>
                                <input type="number" placeholder="number"></input>
                            </div>
                            <input type="submit" value="contact now" className="btn"/>
                        </form>
    </div></section>
    <Footer/>
                    </>)
                    }
                    const Blog= ()=>{
                        return (<>
                        <NavBar/>
                        <section className="blog"><div className="content"><h1>Read our blog...</h1>
                        <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</p>
    </div></section>
                        </>)
                        }
                        
                        
const Bind=()=>{
    return (<><BrowserRouter>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/menu" element={<Menu/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/review" element={<Review/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/blog" element={<Blog/>}/>
        </Routes>
        </BrowserRouter></>);
}



export default Bind;