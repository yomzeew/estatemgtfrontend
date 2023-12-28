import { useEffect, useState } from "react"
import api from "../../api/api"
import Receipt from "./receipt"
import Loader from "../../loader"

const GenerateListtenant = () => {
    const [data, setdata] = useState([])
    const [dataproperty, setdataproperty] = useState([])
    const [datatenant, setdatatenant] = useState([])
    const [tenanttoperty, settenanttoperty] = useState([])
    const [showreceipt,setshowreceipt]=useState(false)
    const [objectdata,setObjectdata]=useState('')
    const [showloader,setshowloader]=useState(false)

   
    
    const fetchtenant = async () => {
        try {
            const response = await api.get('/api/selectall')
            const datares = response.data.data
            console.log(datares)
            if (datares.length > 0) {
                setdatatenant(datares)

            }
            else {
                setdatatenant([])
            }



        } catch(error) {
            console.error(error)

        }
        finally{

        }
    }
    const fetchpayment = async () => {
        setshowloader(true)
        try {
            const response = await api.get('/api/selectallpayment')
            const datares = response.data.data
            console.log(datares)
            if (datares.length > 0) {
                const datacomplete = datares.filter((item) => (
                    item.payment_status === 'complete'

                ))
                setdata(datacomplete)

            }
            else {
                setdata([])
            }




        } catch(error) {
            console.error(error)

        }
        finally{
            setshowloader(false)

        }
    }
    const fetchproperty = async () => {
        try {
            const response = await api.get('/api/selectproperty')
            const datares = response.data.data
            console.log(datares)
            if (datares.length > 0) {
                setdataproperty(datares)

            }
            else {
                setdataproperty([])
            }



        } catch (error) {

        }
    }
    const fetchtenanttoproperty = async () => {
        try {
            const response = await api.get('/api/selectallrent')
            const datares = response.data.data
            console.log(datares)
            if (datares.length > 0) {
                settenanttoperty(datares)

            }
            else {
                settenanttoperty([])
            }



        } catch (error) {

        }
    }
    useEffect(() => {
        fetchpayment()
        fetchtenant()
        fetchtenanttoproperty()
        fetchproperty()



    }, [])
    const handlegenerate=(id,name,address,description,payment_date,due_date,rent_fees,agent_fees,agreement,total_fees)=>{
        setshowreceipt(true)
     
        const object={id:id,name:name,address:address,description:description,payment_date:payment_date,due_date:due_date,rent_fees:rent_fees,agent_fees:agent_fees,agreement:agreement,total_fees:total_fees}
        setObjectdata(object)
    }
    return (
        <div>
           {showreceipt && <div>  
            <div className="flex justify-center">
                <button onClick={()=>setshowreceipt(false)} className="bg-red-500 text-white px-3 rounded-xl"><i class="fa fa-times" aria-hidden="true"></i>Close</button>
            </div>
            <div className="absolute bg-white z-50 overflow-y-scroll h-567">
          
                <Receipt
                objectdata={objectdata}

            />
            </div>
            </div>}

        <div className="md:w-750 w-72 flex justify-center">

            <div>
                
                <div className="flex justify-center">
                    <div className="bg-green-900 w-64 text-sm rounded-b-xl text-yellow-500 h-8 flex justify-center">
                        <i class="fa fa-plus" aria-hidden="true"></i>Display Complete Payment Record
                    </div>

                </div>

                <div className="flex justify-center mt-3">
                    <input className="h-8 rounded-lg w-64 outline-0 border border-slate-300" />
                    <button className="bg-green-900 text-white rounded-lg px-3 h-8">Search</button>

                </div>


                <div className="text-center">{ }</div>

                <div className=" relative overflow-scroll h-567 md:w-750 w-72">
                    <table className="border-0 w-full mt-5">
                        <thead>


                            <tr className="bg-green-400  md:text-sm text-xs">
                                <td className="text-center">
                                    S/N
                                </td>
                                <td className="text-center">
                                    Tenant ID
                                </td>
                                <td className="text-center">
                                    Tenant Name
                                </td>
                                <td className="text-center">
                                    Property Address
                                </td>
                                <td className="text-center">
                                    Description
                                </td>
                                <td className="text-center">
                                    Payment Date
                                </td>
                                <td className="text-center">
                                    Due Date
                                </td>
                                <td className="text-center">
                                    Rent Fees
                                </td>
                                <td className="text-center">
                                    Agent Fees
                                </td>
                                <td className="text-center">
                                    Agreement Fees
                                </td>
                                <td className="text-center">
                                    Total Fees
                                </td>
                                <td className="bg-red-500 px-5 text-center text-white">
                                    Generate Receipt
                                </td>

                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 && data.map((item, index) => {
                                const tenantid = item.tenant_id
                                const tenant = datatenant.find((tenant) => tenant.id === tenantid);

                                if (tenant) {
                                    const firstname = tenant.firstname;
                                    const lastname = tenant.lastname;
                                    const tenantname = firstname + ' ' + lastname;

                                    // Use find instead of filter since you expect a single result
                                    const property = tenanttoperty.find((item) => item.tenant_id === tenantid);

                                    if (property) {
                                        const propertid = property.property_id;
                                        const rent_fees=property.rent_fees
                                        const agent_fees=property.agent_fees
                                        const agreement=property.agreement

                                        // Use find instead of filter since you expect a single result
                                        const addressData = dataproperty.find((item) => item.id === propertid);

                                        if (addressData) {
                                            const address = addressData.property_address;
                                            const description=addressData.description


                                            return (
                                                <tr className=" md:text-sm text-xs">
                                                    <td className="text-center">
                                                        {index + 1}
                                                    </td>
                                                    <td className="text-center">
                                                        {item.tenant_id}
                                                    </td>
                                                    <td className="text-center">
                                                        {tenantname}
                                                    </td>
                                                    <td className="text-center">
                                                        {address}
                                                    </td>
                                                    <td className="text-center">
                                                       {description}
                                                    </td>
                                                    <td className="text-center">
                                                        {item.payment_date}
                                                    </td>
                                                    <td className="text-center">
                                                    {item.due_date}
                                                    </td>
                                                    <td className="text-center">
                                                        {rent_fees}
                                                    </td>
                                                    <td className="text-center">
                                                        {agent_fees}
                                                    </td>
                                                    <td className="text-center">
                                                        {agreement}
                                                    </td>
                                                    <td className="text-center">
                                                        {item.total_fees}
                                                    </td>
                                                    <td onClick={()=>handlegenerate(tenantid,tenantname,address,description,item.payment_date,item.due_date,rent_fees,agent_fees,agreement,item.total_fees)} className="bg-red-500 px-5 text-center text-white">
                                                        Generate Receipt
                                                    </td>

                                                </tr>

                                            )
                                        }
                                    }
                                }
                            })
                            }
                             {showloader && <tr><td colSpan={10} align="center"><Loader/></td></tr>}


                        </tbody>

                    </table>


                </div>


            </div>


        </div>
        </div>

    )

}
export default GenerateListtenant