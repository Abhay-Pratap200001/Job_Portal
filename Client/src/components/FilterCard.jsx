import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'

const filterData = [
{
  filterType:"Location",
  array:["Delhi", "Mumbai", "Indore", "Banglore", "Pune"]
},

{
   filterType:"Industry",
  array:["Frontend", "Backend", "FullStack Developer"] 
},

{
   filterType:"Salary",
  array:["0-40k", "42-1lakh", "1lakh-5lakh"] 
},
]

const FilterCard = () => {
  return (
    <div>
      <h1>Filter Jobs</h1>
      <hr className='mt-5'/>
      <RadioGroup>
        {filterData.map((data, idx) =>(
          <div key={idx} className='flex flex-col gap-2 p-1'>
            <h1>{data.filterType}</h1>

            {
              data.array.map((item, idx) => (
                <div key={idx}>
                  <RadioGroupItem value={item}/>
                  <Label>{item}</Label>
                </div>
              ))
            }
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterCard