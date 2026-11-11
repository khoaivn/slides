const algorithms={
bubble:{name:'Bubble Sort',time:'O(n²)',space:'O(1)',stable:'Có',about:'So sánh hai phần tử liền kề và đổi chỗ nếu chúng sai thứ tự. Sau mỗi lượt, phần tử lớn nhất còn lại sẽ “nổi” về cuối mảng. Dừng sớm khi một lượt không có đổi chỗ.',code:['for end = n − 1 xuống 1','  swapped = false','  for j = 0 đến end − 1','    if A[j] > A[j + 1]','      swap(A[j], A[j + 1])','      swapped = true','  if !swapped: break']},
selection:{name:'Selection Sort',time:'O(n²)',space:'O(1)',stable:'Không',about:'Tìm phần tử nhỏ nhất trong phần chưa sắp xếp, rồi đưa nó về vị trí đầu của phần đó. Ranh giới giữa phần đã sắp xếp và chưa sắp xếp tiến dần sang phải.',code:['for i = 0 đến n − 2','  min = i','  for j = i + 1 đến n − 1','    if A[j] < A[min]: min = j','  swap(A[i], A[min])']},
insertion:{name:'Insertion Sort',time:'O(n²)',space:'O(1)',stable:'Có',about:'Giống như xếp những lá bài trên tay: lấy phần tử tiếp theo và chèn vào đúng vị trí trong phần đã sắp xếp. Các phần tử lớn hơn được dịch sang phải. Hiệu quả với mảng nhỏ hoặc gần có thứ tự.',code:['for i = 1 đến n − 1','  key = A[i]; j = i − 1','  while j ≥ 0 and A[j] > key','    A[j + 1] = A[j]; j = j − 1','  A[j + 1] = key']},
merge:{name:'Merge Sort',time:'O(n log n)',space:'O(n)',stable:'Có',about:'Chia mảng thành hai nửa cho đến khi mỗi phần chỉ có một phần tử. Sau đó trộn các phần đã có thứ tự bằng cách chọn phần tử nhỏ hơn ở đầu hai phần. Bộ đệm tạm được dùng khi trộn.',code:['mergeSort(left, right)','  if left ≥ right: return','  mid = (left + right) / 2','  mergeSort(left, mid)','  mergeSort(mid + 1, right)','  so sánh đầu hai nửa → bộ đệm','  ghi bộ đệm về A[left..right]']},
quick:{name:'Quick Sort',time:'O(n log n)',space:'O(log n)*',stable:'Không',about:'Chọn phần tử cuối làm pivot (mốc), đưa các giá trị nhỏ hơn hoặc bằng pivot sang trái, rồi sắp xếp đệ quy hai phía. *Bộ nhớ trung bình; trường hợp xấu nhất có thời gian O(n²) và bộ nhớ O(n).',code:['quickSort(left, right)','  pivot = A[right]; i = left','  for j = left đến right − 1','    if A[j] ≤ pivot','      swap(A[i], A[j]); i++','  swap(A[i], A[right])','  quickSort hai phía của pivot']},
heap:{name:'Heap Sort',time:'O(n log n)',space:'O(1)',stable:'Không',about:'Xây dựng max-heap, trong đó mỗi cha lớn hơn hoặc bằng các con. Đưa phần tử lớn nhất ở gốc về cuối, thu nhỏ heap và khôi phục tính chất heap. Lặp lại cho đến khi mảng có thứ tự.',code:['xây dựng max-heap','for end = n − 1 xuống 1','  swap(A[0], A[end])','  heapify(0, end)','    chọn con lớn nhất','    so sánh cha với con','    swap và tiếp tục xuống dưới']}
};
algorithms.bubbleBasic={name:'Bubble Sort (không dừng sớm)',time:'O(n²)',space:'O(1)',stable:'Có',about:'So sánh và đổi chỗ các phần tử liền kề. Luôn thực hiện đủ n − 1 lượt, kể cả khi mảng đã có thứ tự; không dùng biến kiểm tra đổi chỗ.',code:['for end = n − 1 xuống 1','  for j = 0 đến end − 1','    if A[j] > A[j + 1]','      swap(A[j], A[j + 1])']};
algorithms.quickHoare={name:'Quick Sort (Hoare)',time:'O(n log n)',space:'O(log n)*',stable:'Không',about:'Chọn giá trị giữa đoạn làm pivot. Hai con trỏ đi từ hai đầu, dừng ở các giá trị sai phía và đổi chỗ. Khi hai con trỏ gặp hoặc vượt nhau, chia tại j và đệ quy [left..j], [j+1..right]. Điểm chia không nhất thiết là vị trí cuối cùng của pivot. *Trung bình; xấu nhất O(n²) thời gian và O(n) bộ nhớ.',code:['quickSort(left, right)','  if left ≥ right: return','  pivot = A[(left + right) / 2]','  i = left − 1; j = right + 1','  while true','    do i++ while A[i] < pivot','    do j-- while A[j] > pivot','    if i ≥ j: break','    swap(A[i], A[j])','  quickSort(left, j)','  quickSort(j + 1, right)']};
algorithms.quickDivide={name:'Quick Sort',time:'O(n log n)',space:'O(log n)*',stable:'Không',about:'Chia đoạn thành hai phần: các giá trị nhỏ ở bên trái, các giá trị lớn ở bên phải. Tiếp tục chia từng phần cho đến khi mỗi đoạn có tối đa một phần tử. Giá trị bằng pivot có thể nằm ở cả hai phía.',code:['quickSort(A, l, r)','  if (l < r)','    pi = partition(A, l, r)','    quickSort(A, l, pi)','    quickSort(A, pi + 1, r)']};
algorithms.lomutoPartition={name:'Lomuto Partition',time:'O(n)',space:'O(1)',stable:'Không',about:'Chọn phần tử cuối làm pivot. Sau phân hoạch, các phần tử bên trái nhỏ hơn pivot, các phần tử bên phải lớn hơn hoặc bằng pivot.',code:['lomutoPartition(A, l, r)','  pivot = A[r]','  i = l - 1','  for (j = l; j < r; j++)','    if (A[j] < pivot)','      i++','      swap(A[i], A[j])','  swap(A[i + 1], A[r])','  return i + 1']};
algorithms.quickLomuto={name:'Quick Sort (Lomuto)',time:'O(n log n)',space:'O(log n)*',stable:'Không',about:'Dùng Lomuto để đưa pivot về đúng vị trí, rồi sắp xếp hai đoạn không chứa pivot.',code:['quickSort(A, l, r)','  if (l < r)','    pi = lomutoPartition(A, l, r)','    quickSort(A, l, pi - 1)','    quickSort(A, pi + 1, r)']};
algorithms.hoarePartition={name:'Hoare Partition',time:'O(n)',space:'O(1)',stable:'Không',about:'Chọn phần tử đầu làm mốc. Hai con trỏ đi từ hai đầu, đổi chỗ các phần tử sai phía và trả về ranh giới khi gặp nhau.',code:['hoarePartition(A, l, r)','  pivot = A[l]','  i = l - 1','  u = r + 1','  while (true)','    do','      i++','    while (A[i] < pivot)','    do','      u--','    while (A[u] > pivot)','    if (i >= u)','      return u','    swap(A[i], A[u])']};
algorithms.quickHoareSort={name:'Quick Sort (Hoare)',time:'O(n log n)',space:'O(log n)*',stable:'Không',about:'Dùng Hoare chọn phần tử đầu làm mốc để chia đoạn, rồi đệ quy hai phần tại ranh giới trả về.',code:['quickSort(A, l, r)','  if (l < r)','    pi = hoarePartition(A, l, r)','    quickSort(A, l, pi)','    quickSort(A, pi + 1, r)']};
function generateSteps(input,type,options={}){const a=[...input],steps=[];let comparisons=0,writes=0,heldKey=null;const emit=(message,line,active=[],pivot=[],done=[])=>steps.push({a:[...a],message,line,active:[...active],pivot:[...pivot],done:[...done],comparisons,writes,heldKey:heldKey?{...heldKey}:null});const swap=(i,j)=>{if(i!==j){[a[i],a[j]]=[a[j],a[i]];writes++}};const range=(l,r)=>Array.from({length:Math.max(0,r-l)},(_,i)=>l+i);const n=a.length;emit('Mảng đã sẵn sàng. Nhấn Chạy mô phỏng hoặc đi từng bước.',-1);
if(type==='bubble'){let done=[];for(let end=n-1;end>0;end--){let changed=false;for(let j=0;j<end;j++){comparisons++;emit(`So sánh ${a[j]} và ${a[j+1]}.`,3,[j,j+1],[],done);if(a[j]>a[j+1]){swap(j,j+1);changed=true;emit('Đổi chỗ hai phần tử liền kề.',4,[],[j,j+1],done)}}done.push(end);emit(`${a[end]} đã ở đúng vị trí.`,0,[],[],done);if(!changed){emit('Không có đổi chỗ trong lượt này. Mảng đã có thứ tự.',6,[],[],range(0,n));break}}}
if(type==='bubbleBasic'){const done=[];const lastEnd=options.bubblePasses===3?Math.max(1,n-3):1;for(let end=n-1;end>=lastEnd;end--){emit(`Bắt đầu lượt với end = ${end}; luôn thực hiện đủ các lượt.`,0,[],[],done);for(let j=0;j<end;j++){comparisons++;emit(`So sánh ${a[j]} và ${a[j+1]}.`,2,[j,j+1],[],done);if(a[j]>a[j+1]){swap(j,j+1);emit('Đổi chỗ hai phần tử liền kề.',3,[j,j+1],[],done)}}done.push(end);emit(`${a[end]} đã ở đúng vị trí. Tiếp tục lượt kế tiếp nếu còn.`,0,[],[],done)}}
// Show each complete partition, then recurse on its two parts.
if(type==='hoarePartition'){
 if(n){
  const l=0,r=n-1,pivot=a[l];let pivotIndex=l,i=l-1,u=r+1;
  emit(`hoarePartition(A, ${l}, ${r})`,0,range(l,r+1));
  emit(`Chọn pivot = A[${l}] = ${pivot}.`,1,[],[pivotIndex]);
  emit(`i = ${i}.`,2,[],[pivotIndex]);
  emit(`u = ${u}.`,3,[],[pivotIndex]);
  while(true){
   emit('Bắt đầu một lượt quét từ hai đầu.',4,[],[pivotIndex]);
   do{
    emit('Dịch con trỏ i sang phải ít nhất một lần.',5,[],[pivotIndex]);
    i++;emit(`Tăng i lên ${i}.`,6,[i],[pivotIndex]);
    comparisons++;emit(`A[${i}] = ${a[i]} < pivot ${pivot}: ${a[i]<pivot?'đúng, tiếp tục':'sai, dừng i'}.`,7,[i],[pivotIndex]);
   }while(a[i]<pivot);
   do{
    emit('Dịch con trỏ u sang trái ít nhất một lần.',8,[i],[pivotIndex]);
    u--;emit(`Giảm u xuống ${u}.`,9,[i,u],[pivotIndex]);
    comparisons++;emit(`A[${u}] = ${a[u]} > pivot ${pivot}: ${a[u]>pivot?'đúng, tiếp tục':'sai, dừng u'}.`,10,[i,u],[pivotIndex]);
   }while(a[u]>pivot);
   emit(`i = ${i}, u = ${u}: i ≥ u là ${i>=u?'đúng':'sai'}.`,11,[i,u],[pivotIndex]);
   if(i>=u){emit(`Trả về u = ${u}. Phần trái [${l}…${u}] ≤ ${pivot}, phần phải [${u+1}…${r}] ≥ ${pivot}. Đây là ranh giới chia, không phải vị trí cố định của pivot.`,12,range(l,u+1),range(u+1,r+1));break}
   swap(i,u);if(pivotIndex===i)pivotIndex=u;else if(pivotIndex===u)pivotIndex=i;
   emit(`Đổi chỗ A[${i}] và A[${u}]. Giá trị pivot vẫn là ${pivot}.`,13,[i,u],[pivotIndex]);
  }
 }
}
if(type==='lomutoPartition'){
 const left=0,right=n-1;
 emit(`lomutoPartition(A, ${left}, ${right})`,0,range(left,right+1));
 if(n){
  const pivot=a[right];let i=left-1;
  emit(`Chọn pivot = A[${right}] = ${pivot}.`,1,[],[right]);
  emit(`Khởi tạo i = ${i}.`,2,[],[right]);
  for(let j=left;j<right;j++){
   emit(`j = ${j}: xét A[${j}] = ${a[j]}.`,3,[j],[right]);
   comparisons++;
   emit(`${a[j]} < ${pivot}: ${a[j]<pivot?'đúng':'sai'}.`,4,[j],[right]);
   if(a[j]<pivot){
    i++;emit(`Tăng i lên ${i}.`,5,[i,j],[right]);
    swap(i,j);emit(`Đổi chỗ A[${i}] và A[${j}].`,6,[i,j],[right]);
   }
  }
  swap(i+1,right);
  emit(`Đưa pivot ${pivot} về vị trí ${i+1}.`,7,[],[i+1]);
  emit(`Trả về ${i+1}. Bên trái < ${pivot}, bên phải ≥ ${pivot}.`,8,range(left,i+1),[i+1]);
 }
}
if(type==='quickHoareSort'){
 const done=[];
 const sort=(l,r)=>{
  emit(`quickSort(A, ${l}, ${r})`,0,range(l,r+1),[],done);
  emit(l<r?`Đoạn [${l}…${r}] cần phân hoạch.`:`Đoạn [${l}…${r}] có tối đa một phần tử, dừng.`,1,range(l,r+1),[],done);
  if(l>=r){if(l===r)done.push(l);return}
  const pivot=a[l];let pivotIndex=l,i=l-1,u=r+1;
  emit(`Hoare: chọn pivot = A[${l}] = ${pivot}.`,2,[],[pivotIndex],done);
  while(true){
   do{i++;comparisons++;emit(`i = ${i}: ${a[i]} < pivot ${pivot}: ${a[i]<pivot?'đúng, đi tiếp':'sai, dừng i'}.`,2,[i],[pivotIndex],done)}while(a[i]<pivot);
   do{u--;comparisons++;emit(`u = ${u}: ${a[u]} > pivot ${pivot}: ${a[u]>pivot?'đúng, đi tiếp':'sai, dừng u'}.`,2,[i,u],[pivotIndex],done)}while(a[u]>pivot);
   if(i>=u)break;
   swap(i,u);if(pivotIndex===i)pivotIndex=u;else if(pivotIndex===u)pivotIndex=i;
   emit(`Đổi chỗ A[${i}] và A[${u}], tiếp tục quét hai đầu.`,2,[i,u],[pivotIndex],done);
  }
  const pi=u;
  emit(`Hoare trả về pi = ${pi}: phần trái ≤ ${pivot}, phần phải ≥ ${pivot}. pi là ranh giới chia, chưa phải vị trí cố định của pivot.`,2,range(l,pi+1),range(pi+1,r+1),done);
  emit(`Tiếp tục sắp xếp phần trái [${l}…${pi}].`,3,range(l,pi+1),[],done);
  sort(l,pi);
  emit(`Tiếp tục sắp xếp phần phải [${pi+1}…${r}].`,4,range(pi+1,r+1),[],done);
  sort(pi+1,r);
 };
 sort(0,n-1);
}
if(type==='quickLomuto'){
 const done=[];
 const sort=(l,r)=>{
  emit(`quickSort(A, ${l}, ${r})`,0,range(l,r+1),[],done);
  emit(l<r?`Đoạn [${l}…${r}] cần phân hoạch.`:`Đoạn [${l}…${r}] có tối đa một phần tử, dừng.`,1,range(l,r+1),[],done);
  if(l>=r){if(l===r)done.push(l);return}
  const pivot=a[r];let i=l-1;
  emit(`Lomuto: chọn pivot = A[${r}] = ${pivot}, i = ${i}.`,2,[],[r],done);
  for(let j=l;j<r;j++){
   comparisons++;
   emit(`A[${j}] = ${a[j]} < pivot ${pivot}: ${a[j]<pivot?'đúng':'sai'}.`,2,[j],[r],done);
   if(a[j]<pivot){i++;swap(i,j);emit(`i = ${i}: đổi chỗ A[${i}] và A[${j}], đưa giá trị bé hơn pivot sang trái.`,2,[i,j],[r],done)}
  }
  const pi=i+1;swap(pi,r);done.push(pi);
  emit(`Lomuto trả về pi = ${pi}. Pivot ${pivot} đã đúng vị trí, bên trái < ${pivot}, bên phải ≥ ${pivot}.`,2,[],[pi],done);
  emit(`Sắp xếp phần trái [${l}…${pi-1}], bỏ qua pivot.`,3,range(l,pi),[],done);
  sort(l,pi-1);
  emit(`Sắp xếp phần phải [${pi+1}…${r}], bỏ qua pivot.`,4,range(pi+1,r+1),[],done);
  sort(pi+1,r);
 };
 sort(0,n-1);
}
if(type==='quickDivide'){
 const done=[];
 const sort=(left,right)=>{
  emit(`quickSort(A, ${left}, ${right})`,0,range(left,right+1),[],done);
  emit(left<right?`Đoạn [${left}…${right}] cần chia tiếp.`:`Đoạn [${left}…${right}] có tối đa một phần tử, dừng.`,1,range(left,right+1),[],done);
  if(left>=right){if(left===right)done.push(left);return}
  const pivot=a[Math.floor((left+right)/2)];
  let i=left-1,j=right+1;
  while(true){
   do{i++;comparisons++}while(a[i]<pivot);
   do{j--;comparisons++}while(a[j]>pivot);
   if(i>=j)break;
   swap(i,j);
  }
  const pi=j;
  emit(`Chia theo mốc ${pivot}: phần nhỏ [${left}…${pi}], phần lớn [${pi+1}…${right}]. Giá trị bằng mốc có thể ở cả hai phần.`,2,range(left,pi+1),range(pi+1,right+1),done);
  emit(`Tiếp tục chia phần trái [${left}…${pi}].`,3,range(left,pi+1),[],done);
  sort(left,pi);
  emit(`Tiếp tục chia phần phải [${pi+1}…${right}].`,4,range(pi+1,right+1),[],done);
  sort(pi+1,right);
 };
 sort(0,n-1);
}
if(type==='quickHoare'){const done=[];const sort=(l,r)=>{if(l>r)return;if(l===r){done.push(l);emit(`Đoạn một phần tử tại ${l} đã có thứ tự.`,1,[],[],done);return}const mid=Math.floor((l+r)/2),pivot=a[mid];let pivotIndex=mid,i=l-1,j=r+1;emit(`Đoạn [${l}…${r}]: chọn pivot = ${pivot} tại ${mid}.`,2,[],[pivotIndex],done);emit(`Khởi tạo i = ${i}, j = ${j}.`,3,[],[pivotIndex],done);while(true){do{i++;comparisons++;emit(`i = ${i}: so sánh ${a[i]} < pivot ${pivot}.`,5,[i],[pivotIndex],done)}while(a[i]<pivot);do{j--;comparisons++;emit(`j = ${j}: so sánh ${a[j]} > pivot ${pivot}.`,6,[j],[pivotIndex],done)}while(a[j]>pivot);emit(`Kiểm tra i = ${i}, j = ${j}: ${i>=j?'dừng phân hoạch':'tiếp tục đổi chỗ'}.`,7,[i,j],[pivotIndex],done);if(i>=j)break;swap(i,j);if(pivotIndex===i)pivotIndex=j;else if(pivotIndex===j)pivotIndex=i;emit(`Đổi chỗ A[${i}] và A[${j}]; pivot vẫn là ${pivot}.`,8,[i,j],[pivotIndex],done)}emit(`Chia tại j = ${j}: [${l}…${j}] và [${j+1}…${r}]. Điểm chia chưa phải vị trí cố định của pivot.`,9,[j,j+1],[pivotIndex],done);sort(l,j);emit(`Sắp xếp đoạn phải [${j+1}…${r}].`,10,range(j+1,r+1),[],done);sort(j+1,r)};sort(0,n-1)}
if(type==='selection'){for(let i=0;i<Math.min(n,options.selectionEnd===undefined?n-1:options.selectionEnd+1);i++){let min=i;emit(`Tìm giá trị nhỏ nhất từ vị trí ${i}.`,1,[],[min],range(0,i));for(let j=i+1;j<n;j++){comparisons++;emit(`So sánh ${a[j]} với giá trị nhỏ nhất hiện tại ${a[min]}.`,3,[j],[min],range(0,i));if(a[j]<a[min]){min=j;emit(`Giá trị nhỏ nhất mới là ${a[min]}.`,3,[],[min],range(0,i))}}swap(i,min);emit(`Đưa ${a[i]} về vị trí ${i}.`,4,[],[i,min],range(0,i+1))}}
if(type==='insertion'){for(let i=1;i<n;i++){let key=a[i],j=i-1;heldKey={value:key,index:i};emit(`Giữ key = ${key}, tìm vị trí chèn.`,1,[i],[],range(0,i));while(j>=0){comparisons++;emit(`So sánh ${a[j]} với key = ${key}.`,2,[j],[j+1]);if(a[j]<=key)break;a[j+1]=a[j];writes++;heldKey={value:key,index:j};emit(`Dịch ${a[j]} sang phải; key = ${key} đang được giữ riêng.`,3,[],[j,j+1]);j--}a[j+1]=key;writes++;heldKey=null;emit(`Chèn ${key} tại vị trí ${j+1}.`,4,[],[j+1],range(0,i+1))}}
if(type==='merge'){const sort=(l,r)=>{if(l>=r)return;let m=Math.floor((l+r)/2);emit(`Chia đoạn [${l}…${r}] thành hai nửa.`,2,range(l,r+1));sort(l,m);sort(m+1,r);let left=a.slice(l,m+1),right=a.slice(m+1,r+1),i=0,j=0,buffer=[];while(i<left.length&&j<right.length){comparisons++;emit(`Trộn: so sánh ${left[i]} và ${right[j]} vào bộ đệm.`,5,[l+i,m+1+j]);buffer.push(left[i]<=right[j]?left[i++]:right[j++])}buffer.push(...left.slice(i),...right.slice(j));for(let k=0;k<buffer.length;k++){a[l+k]=buffer[k];writes++;emit(`Ghi ${buffer[k]} từ bộ đệm vào vị trí ${l+k}.`,6,[],[l+k])}emit(`Đoạn [${l}…${r}] đã được trộn có thứ tự.`,6,range(l,r+1))};sort(0,n-1)}
if(type==='quick'){const done=[];const sort=(l,r)=>{if(l>r)return;if(l===r){done.push(l);emit(`Phần tử tại ${l} đã đúng vị trí.`,0,[],[],done);return}let pivot=a[r],i=l;emit(`Chọn pivot = ${pivot} ở vị trí ${r}.`,1,[],[r],done);for(let j=l;j<r;j++){comparisons++;emit(`So sánh ${a[j]} với pivot = ${pivot}.`,3,[j],[r],done);if(a[j]<=pivot){swap(i,j);emit('Đưa phần tử sang phía trái pivot.',4,[i,j],[r],done);i++}}swap(i,r);done.push(i);emit(`Pivot ${pivot} đã ở vị trí cuối cùng ${i}.`,5,[],[i],done);sort(l,i-1);sort(i+1,r)};sort(0,n-1)}
if(type==='heap'){let done=[];const heapify=(size,root)=>{let largest=root;for(const child of [2*root+1,2*root+2])if(child<size){comparisons++;emit(`So sánh con ${a[child]} với ${a[largest]}.`,5,[largest,child],[],done);if(a[child]>a[largest])largest=child}if(largest!==root){swap(root,largest);emit('Đổi chỗ để khôi phục max-heap.',6,[],[root,largest],done);heapify(size,largest)}};for(let i=Math.floor(n/2)-1;i>=0;i--)heapify(n,i);emit('Max-heap đã được xây dựng.',0);for(let end=n-1;end>0;end--){swap(0,end);done.push(end);emit(`Đưa giá trị lớn nhất ${a[end]} về cuối.`,2,[],[0],done);heapify(end,0)}}
if(type==='lomutoPartition'||type==='hoarePartition'){
 // Partition stops here. Its two sides need not be sorted.
}else if(type==='bubbleBasic'&&options.bubblePasses===3&&n>4){
 emit('Đã chạy 3 lượt đầu. Ba phần tử cuối đã đúng vị trí; phần còn lại chưa được sắp xếp.',-1,[],[],range(n-3,n));
}else if(type==='selection'&&options.selectionEnd!==undefined&&options.selectionEnd<n-2){
 emit('Hoàn thành các lượt i = 0 đến '+options.selectionEnd+'. Các phần tử còn lại chưa được sắp xếp.',-1,[],[],range(0,Math.min(n,options.selectionEnd+1)));
}else{emit('Hoàn thành! Mảng đã được sắp xếp tăng dần.',-1,[],[],range(0,n))}return steps}
if(typeof module!=='undefined')module.exports={algorithms,generateSteps};

algorithms.linear={name:'Linear Search',time:'O(n)',space:'O(1)',stable:'Không cần',about:'Duyệt từ trái sang phải và so sánh từng phần tử với giá trị cần tìm. Dừng tại lần khớp đầu tiên hoặc khi hết mảng. Không yêu cầu mảng có thứ tự.',code:['for i = 0 đến n − 1','  if A[i] == target','    return i','return −1']};
algorithms.binary={name:'Binary Search',time:'O(log n)',space:'O(1)',stable:'Tăng dần',about:'Chỉ hoạt động trên mảng đã sắp xếp tăng dần. So sánh giá trị cần tìm với phần tử giữa, rồi loại bỏ một nửa phạm vi. Công cụ sắp xếp bản sao mảng trước khi tìm; các chỉ số hiển thị thuộc mảng đã sắp xếp. Khi trùng giá trị, có thể trả về bất kỳ vị trí khớp nào.',code:['left = 0; right = n − 1','while left ≤ right','  mid = (left + right) / 2','  if A[mid] == target: return mid','  if A[mid] < target: left = mid + 1','  else: right = mid − 1','return −1']};
function generateSearchSteps(input,type,target){
 if(type==='bst')return generateBSTSteps(input,target);
 const a=type==='binary'?[...input].sort((x,y)=>x-y):[...input],steps=[];let comparisons=0;
 const emit=(message,line,active=[],pivot=[],done=[],excluded=[],result=null)=>steps.push({a:[...a],message,line,active,pivot,done,excluded,comparisons,writes:0,result});
 emit(type==='binary'?`Đã sắp xếp bản sao mảng tăng dần. Tìm ${target} trong mảng này.`:`Tìm ${target} từ trái sang phải.`,-1);
 if(type==='linear'){for(let i=0;i<a.length;i++){comparisons++;emit(`So sánh A[${i}] = ${a[i]} với ${target}.`,1,[i],[],[],Array.from({length:i},(_,j)=>j));if(a[i]===target){emit(`Tìm thấy ${target} tại chỉ số ${i}.`,2,[],[],[i],Array.from({length:i},(_,j)=>j),i);return steps}}}
 else{let l=0,r=a.length-1;const excluded=()=>a.map((_,i)=>i).filter(i=>i<l||i>r);while(l<=r){let m=Math.floor((l+r)/2);emit(`Phạm vi [${l}…${r}], chọn mid = ${m}.`,2,[l,r],[m],[],excluded());comparisons++;emit(`So sánh A[${m}] = ${a[m]} với ${target}.`,3,[l,r],[m],[],excluded());if(a[m]===target){emit(`Tìm thấy ${target} tại chỉ số ${m} trong mảng đã sắp xếp.`,3,[],[],[m],excluded(),m);return steps}if(a[m]<target){l=m+1;emit(`${a[m]} < ${target}: loại nửa trái, left = ${l}.`,4,[],[],[],excluded())}else{r=m-1;emit(`${a[m]} > ${target}: loại nửa phải, right = ${r}.`,5,[],[],[],excluded())}}}
 emit(`Không tìm thấy ${target} trong mảng.`,type==='linear'?3:6,[],[],[],a.map((_,i)=>i),-1);return steps;
}
if(typeof module!=='undefined')module.exports.generateSearchSteps=generateSearchSteps;

algorithms.bst={name:'Binary Search Tree',time:'O(h)',space:'O(n)*',stable:'Không cần',about:'Dựng cây theo thứ tự các phần tử trong mảng: giá trị nhỏ hơn đi trái, lớn hơn hoặc bằng đi phải. Tìm từ gốc, chỉ theo một nhánh ở mỗi bước. Giá trị trùng được chèn bên phải. Tìm kiếm mất O(h), với h là chiều cao cây: O(log n) khi cân bằng, O(n) khi cây lệch. *Lưu cây tốn O(n); tìm kiếm lặp dùng O(1) bộ nhớ phụ. Thống kê so sánh chỉ tính giai đoạn tìm kiếm.',code:['node = root','while node ≠ null','  if target == node.value: return node.index','  if target < node.value','    node = node.left','  else: node = node.right','return −1']};
function generateBSTSteps(input,target){
 const nodes=input.map((value,index)=>({value,index,left:null,right:null}));
 for(let i=1;i<nodes.length;i++){let current=0;while(true){const side=nodes[i].value<nodes[current].value?'left':'right';if(nodes[current][side]===null){nodes[current][side]=i;break}current=nodes[current][side]}}
 let current=nodes.length?0:null,comparisons=0;const steps=[],path=[];
 const emit=(message,line,active=[],done=[],result=null)=>steps.push({a:[...input],tree:nodes,message,line,active,pivot:[],done,excluded:[],path:[...path],comparisons,writes:0,result});
 emit(`Cây được dựng theo thứ tự mảng. Bắt đầu tìm ${target} từ gốc.`,0);
 while(current!==null){path.push(current);comparisons++;const node=nodes[current];emit(`So sánh ${target} với nút ${node.value} (A[${current}]).`,2,[current]);if(target===node.value){emit(`Tìm thấy ${target} tại nút A[${current}].`,2,[],[current],current);return steps}const left=target<node.value,side=left?'left':'right';emit(`${target} ${left?'<':'>'} ${node.value}: đi sang ${left?'trái':'phải'}.`,left?4:5,[current]);current=node[side]}
 emit(`Gặp nhánh rỗng. Không tìm thấy ${target} trong cây.`,6,[],[],-1);return steps;
}
if(typeof module!=='undefined')module.exports.generateBSTSteps=generateBSTSteps;
