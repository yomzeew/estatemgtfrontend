import { useRef,useState } from 'react'
import logo from '../../images/logo.png'
import html2pdf from 'html2pdf.js';

const Receipt=({objectdata})=>{
    const [removescale, setremovescale]=useState(false)
    const contentRef=useRef(null)
    const handleDownloadPDF = () => {
        setremovescale(true)
        const contentElement = contentRef.current;
        const options = {
            margin: [0, 0, 0, 0],
            filename: 'Receipt.pdf',
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { scale: 2},
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          };
          html2pdf()
          .set(options)
          .from(contentElement )
          .save()
          .then(() => {
            console.log('PDF downloaded successfully');
          })
          .catch((error) => {
            console.error('Error while downloading PDF:', error);
          });
    
  
      };
      const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
        return formattedDate;
      };

    return(
        <div className="md:w-750 w-72 h-screen font-serif bg-white">
            <div ref={contentRef} className={`flex  justify-center h-auto ${removescale?'scale-75':'scale-100'}  `}>
                <div className='md:w-1/2 w-screen'>
            <div className='flex justify-between px-5 pt-2'>
                <div className='mt-7 ml-5'>
                    <div className="w-32 h-4 bg-green-900"></div>
                    <div className="text-3xl">Receipt</div>
                    </div>
                    <div>
                        <img className='w-24 h-auto object-contain ' src={logo} />
                    </div>

            </div>
            <div className='flex justify-between px-7 gap-5 mt-7 flex-wrap  '>
                <div className='flex justify-center md:w-auto w-full'>
                    <div>
                    <div><span className='text-xl'> From:</span></div>
                  <div><span>Chukwu Ezeokeke & Associate </span></div> 
                  <div>Head Office:</div>
                  <div> Enugu 54 Chime Avenue, New Haven</div>

                    </div>
                  
                </div>
                <div className='md:border-l-2 border-l-0 md:border-t-0 border-t-2 border-black px-5 flex justify-center md:w-auto w-full'>
                    <div>
                    <div><span className='font-bold'>Receipt No:</span>000{objectdata.id}0</div> 
                   <div> <span className='font-bold'>Receipt Date:</span>{formatDate(objectdata.payment_date)}</div>
                   <div><span className='font-bold' >Due Date:</span>{formatDate(objectdata.due_date)}</div>

                    </div>
              
                </div>

            </div>

            <div className='mt-5 px-7'>
                <div>
                    <span className='text-xl font-bold'>Bill to:</span>
                </div>
                <div>{objectdata.name}</div>
                <div>{objectdata.address}</div>
                <div>Tenant ID:{objectdata.id}</div>

            </div>
            <div className='px-7'>
            <table  className=" mt-5 border w-full">
                <thead className='border'>
                    <tr>
                        <th>Qty</th>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                
                </thead>
                <tbody>
                    <tr className='h-16'>
                        <td className='text-center'>
                            1
                            
                        </td>
                        <td className='text-center'>
                           {objectdata.description||''}
                            
                        </td>
                        <td className='text-center'>
                            {objectdata.rent_fees}
                            
                        </td>
                    </tr>
                    <tr className='h-16'>
                        <td className='text-center'>
                            2
                            
                        </td>
                        <td className='text-center'>
                            Agent Fees
                            
                        </td>
                        <td className='text-center'>
                            {objectdata.agent_fees}
                            
                        </td>
                    </tr>
                    <tr className='h-16'>
                        <td className='text-center'>
                            3
                            
                        </td>
                        <td className='text-center'>
                           Agreement
                            
                        </td>
                        <td className='text-center'>
                        {objectdata.agreement}
                            
                        </td>
                    </tr>
                    <tr className='mt-5 border-2'>
                        <td colSpan="3" className='h-8'>
                            <div className='text-right font-bold'>Total : {objectdata.total_fees}</div>
                        </td>

                    </tr>

                </tbody>

            </table>
            <div className='mt-3'>
                <div><span className='font-bold'>Signed:</span><span className='text-xl'>The Manager</span></div>
               <div className='text-red-500 font-bold'>Term and Condition:</div> 
            </div>
            </div>
           
            </div>

            </div>
            <div className='mt-1 flex justify-center'>
               <button onClick={handleDownloadPDF} className='bg-green-900 px-5 rounded-xl text-yellow-500 h-8 font-sans'>Download Receipt</button>
            </div>
            



        </div>
    )
}
export default Receipt