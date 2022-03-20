#!/usr/bin/env node
const nums = [
	1,2,3,4,
	5,6,7,8,
	9,10,11,12,
]
function print_row_col(nums){
	const func = Math.ceil
	const COLS = 4
	for (let i =0;i<nums.length;i++){
		const row = func((i+1)/COLS)
		const col = i % COLS + 1
		console.log("Number: ",nums[i])
		console.log("Row is: ",row)
		console.log("Col is: ",col)
		console.log("")
	}
}

print_row_col(nums)
