//Sum of scalar and vector
export function sv_sum(scalar, vec) {
    let result = new Array(vec.length);
    for (let k = 0; k < vec.length; k++) {
        result[k] = scalar + vec[k];
    }
    return result;
}

//Product of scalar and vector    
export function sv_prod(scalar, vec) {
    let result = new Array(vec.length);
    for (let k = 0; k < vec.length; k++) {
        result[k] = scalar * vec[k];
    }
    return result;
}    

export function ew_mean(vec1, vec2) {
    // For simplicity, assume both vectors are equal in length
    let result = new Array(vec1.length);
    for (let k = 0; k < vec1.length; k++) {
        result[k] = (vec1[k] + vec2[k])/2;
        // console.log(vec1[k])
        // result [k]
    }
    return result;
}

export function ew_sum(vec1, vec2) {
    // For simplicity, assume both vectors are equal in length
    let result = new Array(vec1.length);
    for (let k = 0; k < vec1.length; k++) {
        result[k] = vec1[k] + vec2[k];
        // console.log(vec1[k])
        // result [k]
    }
    return result;
}

//Elementwise product:掛け算
function ew_sum2(vec) {
    // For simplicity, assume both vectors are equal in length
    let result = new Array(vec[0].length);
    result.fill(0)
    for (let j = 0; j < vec.length;j++){
        for (let k = 0; k < vec[0].length; k++) {
            result[k] += vec[j][k]
            console.log(result, vec[j][k],vec.length,vec[0].length)
        }
    }
    for(let k = 0;k <result.length;k++){
        result[k] /= vec.length;
    }
    return result;
}


//Elementwise product:掛け算
export function ew_prod(vec1, vec2) {
    // For simplicity, assume both vectors are equal in length
    let result = new Array(vec1.length);
    for (let k = 0; k < vec1.length; k++) {
        result[k] = vec1[k] * vec2[k]; 
    }
    return result;
}

//Elementwise quotient:割り算
function ew_quot(vec_num, vec_den) {
    // For simplicity, assume both vectors are equal in length
    let result = new Array(vec_num.length);
    for (let k = 0; k < vec_num.length; k++) {
        result[k] = vec_num[k] / vec_den[k];
    }
    return result;
}

//Apply sine function to all elements in a vector
function sin_vec(vec) {
    let result = new Array(vec.length);
    for (let k = 0; k < vec.length; k++) {
        result[k] = Math.sin(vec[k]);
    }
    return result;
}

//Apply cosine function to all elements in a vector
export function cos_vec(vec) {
    let result = new Array(vec.length);
    for (let k = 0; k < vec.length; k++) {
        result[k] = Math.cos(vec[k]);
    }
    return result;
}

//Apply modulo function to all elements in a vector
function mod_vec(vec, d) {
    let result = new Array(vec.length);
    for (let k = 0; k < vec.length; k++) {
        result[k] = vec[k] % d;
    }
    return result;
}

//Create a vector of ones
export function ones(len) {
    return new Array(len).fill(1);
}

//Create a vector of zeros
function zeros(len) {
    return new Array(len).fill(0);
}

//Random permuation of digits from 0 to n-1 (source: https://github.com/scijs/random-permutation)
function randperm(n) {
  var result = new Array(n)
  result[0] = 0
  for(var i=1; i<n; ++i) {
    var idx = (Math.random()*(i+1))|0
    if(idx < i) {
      result[i] = result[idx]
    }
    result[idx] = i
  }
  return result
}

//Use vector I to index vector V
function v_i(V, I) {
    var result = new Array(I.length);
    for (let k = 0; k < I.length; k++) {
        result[k] = V[I[k]];
    }
    return result;
}

//Create a vector from 0 to N-1
function consec(N) {
    return Array.from(Array(N).keys());
}

//Elementwise product:掛け算:実部と虚部を分ける
function re_im_mult(x,y){
    const z = [];
    for (let i = 0; i < x.length; i++) {
    const re = x[i].re * y[i] ;
    const im = x[i].im * y[i] ;
    z.push({re, im});
    }
    return z;
}