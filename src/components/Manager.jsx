import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

    const ref = useRef()
    const passwordref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })

    const [passwordsarray, setPasswordsarray] = useState([])

    const getpasswords=async()=>{
        let res=await fetch("http://localhost:3000/")
        let passwords=await res.json()
        console.log(passwords)
        setPasswordsarray(passwords)

    }

    useEffect(() => {
        getpasswords()
    }, []);

    const copytext = (text) => {
        toast('Copied To Clipbord!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    const showpassword = () => {

        // show the paswword
        if (ref.current.src.includes("/icons/eyecross.png")) {
            ref.current.src = "/icons/eye.png"
            passwordref.current.type = "password"
        }

        else {
            ref.current.src = "/icons/eyecross.png"
            passwordref.current.type = "text"
        }
    }


    const savepassword = async() => {
        // const updatedPasswords = [...passwordsarray, {...form,id:uuidv4()}];
        // localStorage.setItem("passwords", JSON.stringify(updatedPasswords)); // Ensure JSON is stored correctly

        // await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })
        setPasswordsarray([...passwordsarray, {...form,id:uuidv4()}]);

        await fetch("http://localhost:3000/",{method:"POST",  headers: { "Content-Type": "application/json" },body: JSON.stringify({...form,id:uuidv4()})})

        // console.log(updatedPasswords);
        setform({ site: "", username: "", password: "" })
        toast('The Password Is Been Saved Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const deletepassword=async(id)=>{
     let c=confirm("do you realy wnated to delete ")
     if(c){

         const updatedPassword = passwordsarray.filter(item => item.id !== id);
         setPasswordsarray(updatedPassword);
        //  localStorage.setItem("passwords", JSON.stringify(updatedPassword));

        // await fetch("http://localhost:3000/",{method:"DELETE",  headers: { "Content-Type": "application/json" },body: JSON.stringify({...form,id})})
        await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })
        }
        toast('The Password Is Been Deleted!', {
           position: "top-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: false,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "dark",
       });

    }

    const editpassword=async(id)=>{
        toast('The Password Is Been Edited!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
       console.log("editing this item ",id )
       setform(passwordsarray.filter(items=>items.id===id)[0])
       setPasswordsarray(passwordsarray.filter(items=>items.id!=id))
       await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })
    }

    const handelchange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    return (

        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />

            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absoluteLeft-0 right-0Top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-500 opacity-20 blur-[100px]"></div></div>

            <div className=" mycontainer">
                <h1 className='text-4xl font-bold text-center '>
                    <span className='text-green-600'>&lt;</span>
                    PassOP
                    <span className='text-green-600'>/&gt;</span>

                </h1>
                <p className='text-lg text-center'>Your Own Password Manager</p>

                <div className="text-white flex flex-col p-4 gap-4 justify-normal items-center ">
                    <input onChange={handelchange} value={form.site} className='rounded-full border border-green-500 w-full text-black p-2 ' type="text" name="site" id="" placeholder='Enter your URL' />

                    <div className="flex w-full gap-4">
                        <input onChange={handelchange} value={form.username} className='rounded-full border border-green-500 w-full text-black p-2 ' type="text" name="username" id="" placeholder='Enter Username' />

                        <div className="relative">
                            <input ref={passwordref} onChange={handelchange} value={form.password} className='rounded-full border border-green-500 w-full text-black p-2 ' type="password" name="password" id="" placeholder='Enter Password' />
                            <span className='absolute right-1 text-black top-1 ' onClick={showpassword}>
                                <img ref={ref} className='p-1 cursor-pointer top-2' width={30} src="/icons/eye.png" alt="" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savepassword} className='text-black flex justify-center items-center bg-green-500 hover:bg-green-200 rounded-full w-fit px-8 py-2 gap-2 border border-green-400  '>
                        <lord-icon
                            src="https://cdn.lordicon.com/hqymfzvj.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Save  password
                    </button>
                </div>

                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your passwords</h2>
                    {passwordsarray.length === 0 && <div>No Passwords To Show</div>}
                    {passwordsarray.length != 0 && <table class="table-auto w-full rounded-md overflow-hidden ">
                        <thead className='bg-green-500 text-white'>
                            <tr>
                                <th>Site</th>
                                <th>Username</th>
                                <th>Passwords</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-200'>
                            {passwordsarray.map((items, index) => {
                                return <tr key={index}>
                                    <td className=' py-2 border border-white'>
                                        <div className='flex items-center justify-center'>
                                            <a href={items.site} target='_blank'>{items.site}</a>


                                            <div className='lordiconscopy size-7 cursor-pointer' onClick={() => { copytext(items.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddinTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>

                                    <td className=' py-2 border border-white '>

                                        <div className='flex items-center text-center justify-center'>
                                            <span>{items.username}</span>
                                            <div className='size-7 cursor-pointer' onClick={() => { copytext(items.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='  text-center py-2 border border-white '>
                                        <div className='flex items-center justify-center text-center'>
                                            <span>{items.password}</span>
                                            <div className='size-7 cursor-pointer' onClick={() => { copytext(items.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='  text-center py-2 border border-white space-x-4 cursor-pointer'>
                                        <span onClick={()=>deletepassword(items.id)}><lord-icon
                                            src="https://cdn.lordicon.com/skkahier.json"
                                            trigger="hover"
                                            style={{"width":"25px", "height":"25px"}}>
                                        </lord-icon></span>

                                        <span onClick={()=>editpassword(items.id)}>
                                        <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{"width":"25px", "height":"25px"}}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>

                            })}

                        </tbody>
                    </table>}
                </div>
            </div>
        </>

    )
}

export default Manager
