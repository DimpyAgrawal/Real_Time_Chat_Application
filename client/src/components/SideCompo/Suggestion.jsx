import React from 'react'

function Suggestion() {
  return (
    <div>
    <div className='flex flex-col h-screen justify-center items-center'>
    <div className="max-w-xs rounded-md shadow-md dark:bg-gray-900 ">
	<img src="https://source.unsplash.com/random/300x300/?2" alt="" className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500" />
	<div className="flex flex-col justify-between p-6 space-y-8">
		<div className="space-y-2">
			<h2 className="text-3xl font-semibold tracki">Donec lectus leo</h2>
			<p className="">Curabitur luctus erat nunc, sed ullamcorper erat vestibulum eget.</p>
		</div>
		<button type="button" className="flex items-center justify-center w-full p-3 font-semibold tracki rounded-mdbg-violet-400  bg-slate-500">Read more</button>
	</div>
</div>
</div>
    </div>
  )
}

export default Suggestion
