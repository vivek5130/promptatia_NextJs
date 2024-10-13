"use client"
// Since we are using usestate hook we need use client

import {signIn, signOut, useSession, getProviders} from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const Nav = () => {
    // const isUserLoggedIn = true;
    const {data : session} = useSession()
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false)
    useEffect(() => {
        (async () => {
          const res = await getProviders();
          setProviders(res);
        })();
      }, []);
  return (
    <nav className ="flex-between w-full mb-16 pt-3">
        <Link href = '/' className = 'flex gap-2  flex-center'>
            <Image src = "/assets/images/logo.svg" width = '30' height = '30' alt = 'Promptatia logo' className = "object-contain"/>
            <p className = 'logo_text'>Promptatia</p>
        </Link>
        {/* Desktop navigation */}
        {/* In this view create-prompt signout and profile has 3 buttons shown directly on navbar */}
        <div className = "sm:flex hidden">
            {/* If user is logged in then show create post and profile buttons */}
            {session?.user ? 
            (<div className="flex gap-3 md:gap-5"> 
                <Link href="/create-prompt" className = "black_btn">
                    Create Post
                </Link>
                <button type="button" onClick= {signOut} className = "outline_btn">
                    Sign Out
                </button>
                <Link href = "/profile">
                    <Image src = {session?.user.image} width = {37} height = {37} className = "rounded-full" alt = "profileImage"   />
                </Link>
            </div>)
            :
            // if user is not Logged in the sign up using getProvider
            (<>
                {providers &&
                    Object.values(providers).map((provider)=>(
                        <button type = "button" key = {provider.name} onClick = {()=> signIn(provider.id)} className = "black_btn">
                            Sign In
                        </button>
                    ))
                }
            </>) }
        </div>
        {/* Mobile Navigation */}
        {/* Need to show profile create-prompt and signout button on toggling the profile picture */}
             

        <div className = "sm:hidden flex relative">
            {session?.user ?
            (<div className = "flex">
                <Image src = {session?.user.image} width = {37} height = {37} className = "rounded-full" alt = "profileImage"  onClick = {()=>{setToggleDropdown((prev) => !prev)}} />
                {toggleDropdown&&
                    (<div className = "dropdown">
                        <Link href= "/profile" className = "dropdown_link" onClick = {()=>{setToggleDropdown(false)}}>My Profile</Link>
                        <Link href= "/create-prompt" className = "dropdown_link" onClick = {()=>{setToggleDropdown(false)}}>Create Prompt</Link>
                        <button type= "button" className = "mt-5 w-full black_btn" onClick= {()=>{setToggleDropdown(false); signOut()}} >Sign Out</button>
                    </div>)
                
                 
            
            }
            </div>)
                :(<>
                    {providers &&
                    Object.values(providers).map((provider)=>(
                        <button type = "button" key = {provider.name} onClick = {()=> signIn(provider.id)} className = "black_btn">
                            Sign In
                        </button>
                    ))
                }
                </>) 
            }
        </div>
    </nav>
  )
}

export default Nav
