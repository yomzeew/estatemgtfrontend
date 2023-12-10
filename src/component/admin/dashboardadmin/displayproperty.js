import RealEstate from './image/Real-Estate-2.jpg'

const Displayproperty=()=>{
    return(
        <div className="md:w-96 w-56 flex justify-center">
            <div>
            <div className=''>
                <div className="absolute px-2"><i class="fa fa-search text-slate-300" aria-hidden="true"></i></div>
                <input className="md:w-96 w-56 h-8 outline-0 border rounded-2xl px-7"/>
            </div>
            <div className="md:w-96 w-56 border border-dashed bg-slate-200 rounded-lg h-auto gap-5 flex flex-col md:flex-row px-3 py-5 mt-3 border-black">
                <div className="md:w-1/2 w-full">
                    <img src={RealEstate} className='object-fit rounded-2xl' />

                </div>
                <div className="md:w-1/2 w-full">
                    <div className='flex justify-end text-xs'>
                        #Property ID:020
                    </div>
                    <div className='text-sm'>
                    No 7 Wuse Street Abuja Nigeria
                    </div>
                    <div className='text-xs'>
                    <div><span className='text-green-900'>Rent fees:</span><span className='text-red-500 font-bold'>N1,200,000</span></div>
                    <div>
                    <span className='text-green-900'>Agent fees:</span><span className='text-red-500 font-bold'>N120,000</span>

                    </div>
                    <div>
                    <span className='text-green-900'>Agreement:</span><span className='text-red-500 font-bold'>N60,000</span>

                    </div>


                    </div>
                    <div>
                        <span className='text-lg text-green-600'>Total:</span><span className='text-lg font-bold text-green-900'>N1,380,000</span>
                    </div>
                    <div className='mt-2'>
                    <button className='bg-green-900 h-8 w-full text-center text-sm rounded-lg text-yellow-500'>
                           Available
                        </button>

                    </div>


                </div>

            </div>
            <div className="md:w-96 w-56 border border-dashed bg-slate-200 rounded-lg h-auto gap-5 flex flex-col md:flex-row px-3 py-5 mt-3 border-black">
                <div className="md:w-1/2 w-full">
                    <img src={RealEstate} className='object-fit rounded-2xl' />

                </div>
                <div className="md:w-1/2 w-full">
                    <div className='flex justify-end text-xs'>
                        #Property ID:020
                    </div>
                    <div className='text-sm'>
                    No 7 Wuse Street Abuja Nigeria
                    </div>
                    <div className='text-xs'>
                    <div><span className='text-green-900'>Rent fees:</span><span className='text-red-500 font-bold'>N1,200,000</span></div>
                    <div>
                    <span className='text-green-900'>Agent fees:</span><span className='text-red-500 font-bold'>N120,000</span>

                    </div>
                    <div>
                    <span className='text-green-900'>Agreement:</span><span className='text-red-500 font-bold'>N60,000</span>

                    </div>


                    </div>
                    <div>
                        <span className='text-lg text-green-600'>Total:</span><span className='text-lg font-bold text-green-900'>N1,380,000</span>
                    </div>
                    <div className='mt-2'>
                    <button className='bg-green-900 h-8 w-full text-center text-sm rounded-lg text-yellow-500'>
                           Available
                        </button>

                    </div>


                </div>

            </div>



            </div>
           
        </div>
    )
}
export default Displayproperty