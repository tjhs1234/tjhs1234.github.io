function maxTriple(nums){
  let first = nums[0];
  let mid = nums[(nums.length - 1) / 2];
  let last = nums[nums.length - 1];
  if (first > last && first > mid) {
    return first;
  }
  else if (mid > last && mid > first) {
    return mid;         
  }
  else {
    return last;
  }
}