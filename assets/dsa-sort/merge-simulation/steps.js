const mergeCode=['Merge(A, l, mid, r)','  i = l','  j = mid + 1','  v = l','  while (i <= mid && j <= r)','    if (A[i] <= A[j])','      C[v] = A[i]','      i++','    else','      C[v] = A[j]','      j++','    v++','  while (i <= mid)','    C[v] = A[i]','    i++','    v++','  while (j <= r)','    C[v] = A[j]','    j++','    v++','  return C'];
function mergeSteps(arr,l,mid,r){
 const out=Array(arr.length).fill(null),steps=[];let i=null,j=null,v=null;
 const emit=(line,message)=>steps.push({line,message,i,j,v,c:[...out]});
 emit(0,'Hai đoạn đầu vào đã được sắp xếp.');i=l;emit(1,'Khởi tạo i ở đầu đoạn trái.');j=mid+1;emit(2,'Khởi tạo j ở đầu đoạn phải.');v=l;emit(3,'Khởi tạo vị trí ghi v trong C.');
 while(true){emit(4,'Kiểm tra cả hai đoạn còn phần tử.');if(!(i<=mid&&j<=r))break;
 emit(5,`So sánh A[${i}] = ${arr[i]} và A[${j}] = ${arr[j]}.`);
 if(arr[i]<=arr[j]){out[v]=arr[i];emit(6,`Ghi ${arr[i]} từ đoạn trái vào C[${v}].`);i++;emit(7,'Tăng i.');}
 else{emit(8,'Phần tử ở đoạn phải nhỏ hơn.');out[v]=arr[j];emit(9,`Ghi ${arr[j]} từ đoạn phải vào C[${v}].`);j++;emit(10,'Tăng j.');}
 v++;emit(11,'Tăng v.');}
 while(true){emit(12,'Kiểm tra phần còn lại của đoạn trái.');if(i>mid)break;out[v]=arr[i];emit(13,`Chép ${arr[i]} vào C[${v}].`);i++;emit(14,'Tăng i.');v++;emit(15,'Tăng v.');}
 while(true){emit(16,'Kiểm tra phần còn lại của đoạn phải.');if(j>r)break;out[v]=arr[j];emit(17,`Chép ${arr[j]} vào C[${v}].`);j++;emit(18,'Tăng j.');v++;emit(19,'Tăng v.');}
 emit(20,'Trả về C: hai đoạn đã được trộn thành một đoạn có thứ tự.');return steps;
}
if(typeof module!=='undefined')module.exports={mergeSteps,mergeCode};
