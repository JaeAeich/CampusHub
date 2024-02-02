import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from './ui/button'

function UserProfile() {
  return (

<div className="bg-background w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-primary">
    <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
        <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-secondary top-12">

            <h2 className="pl-3 mb-4 text-xl font-semibold">My Account</h2>

            <Button className="flex items-center px-3 py-2.5 font-bold bg-background  text-primary border rounded-full">
                Account Details
            </Button>
            <Button className="flex items-center px-3 py-2.5 font-bold bg-background  text-primary border rounded-full">
                Wishlist 
            </Button>
            <Button className="flex items-center px-3 py-2.5 font-bold bg-background  text-primary border rounded-full">
                Past Orders
            </Button>
        </div>
    </aside>
    <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
        <div className="p-2 md:p-4">
            <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                <h2 className="pl-6 text-2xl font-bold sm:text-xl">Account Details</h2>

                <div className="grid max-w-2xl mx-auto mt-8">
                    <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">

                        <img className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-secondary dark:ring-background"
                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                            alt="Bordered avatar"/>

                        <div className="flex flex-col space-y-5 sm:ml-8">
                            <button type="button"
                                className="py-3.5 px-7 text-base font-medium text-primary focus:outline-none bg-accent rounded-lg border border-accent hover:bg-accentDark focus:z-10 focus:ring-4 focus:ring-accent ">
                                Change picture
                            </button>
                            <button type="button"
                                className="py-3.5 px-7 text-base font-medium text-primary focus:outline-none bg-secondary rounded-lg border border-secondary hover:bg-darkgray hover:text-primary focus:z-10 focus:ring-4 focus:ring-darkgray ">
                                Delete picture
                            </button>
                        </div>
                    </div>

                    <div className="items-center mt-8 sm:mt-14 text-primary">

                        <div
                            className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                            <div className="w-full">
                                <label htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-primary dark:text-background">Name</label>
                                <input type="text" id="name"
                                    className="bg-background border darkgray text-primary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
                                    placeholder="Name" value="Jane" required/>
                            </div>

                        </div>

                        <div className="mb-2 sm:mb-6">
                            <label htmlFor="email"
                                className="block mb-2 text-sm font-medium text-primary dark:text-background">Email</label>
                            <input type="email" id="email"
                                className="bg-background border darkgray text-primary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
                                placeholder="your.email@mail.com" required/>
                        </div>
                        <div className="mb-2 sm:mb-6">
                            <label htmlFor="phoneNumber"
                                className="block mb-2 text-sm font-medium text-primary dark:text-background">Phone Number</label>
                            <input type="tel" id="phoneNumber"
                                className="bg-background border darkgray text-primary text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
                                placeholder="9876543210" required/>
                        </div>

                        <div className="mb-2 sm:mb-6">
                        <label htmlFor="gender"
                                className="block mb-2 text-sm font-medium text-primary dark:text-background">Gender</label>
                        <Select>
                        <SelectTrigger className="w-full">
                            {/* //TODO: Placeholder to contain user's gender. */}
                            <SelectValue placeholder="Gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                        </Select>
                        </div>

                        <div className="mb-6">
                            
                        </div>

                        <div className="flex justify-end">
                            <button type="submit"
                                className="text-background bg-accent  hover:bg-accentDark focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-accent dark:focus:ring-accentDark">Save</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </main>
</div>
  )
}

export default UserProfile
