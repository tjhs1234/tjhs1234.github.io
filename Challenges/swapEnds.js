function swapEnds(nums){
  let first = nums[0];
  nums[0] = nums[nums.length - 1];
  nums[nums.length - 1] = first;
  return nums;
}