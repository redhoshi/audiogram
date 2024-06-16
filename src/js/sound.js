//////////////////////////////////
// Setup
//////////////////////////////////

import { cos_vec, sv_prod, sv_sum, ew_prod, ones } from '../js/math_helpers'

//complex_tone 単音
var fs = NaN;

let AudioContext = window.AudioContext || window.webkitAudioContext;
let aud_ctx;
let source;

//Mono
let channels = 1;


function init() {
  aud_ctx = new AudioContext();
  fs = aud_ctx.sampleRate; 
}

//Create array (vec) of tone with sepcified frequency
function Time2Freq(freq) { // return freq array
    //Parameters
    let pip_duration = 0.4;//
    let pip_len      = Math.ceil(fs * pip_duration);
    let ramp_dur     = 0.0225;
    let r            = Math.ceil(ramp_dur * fs);

    //Create scramble waveform
    var waveform = new Array;

    waveform = waveform.concat(cos_vec(sv_prod( 2 * Math.PI * freq / fs, Array.from(Array(pip_len).keys()))))
    return waveform;
}

function Cos2Ramp(fs,waveformtmp) { 
    //Create the ramp-damp mask
    let pip_duration = 0.4;
    let pip_len      = Math.ceil(fs * pip_duration);
    let ramp_dur     = 0.0225;// 0.0225
    let r            = Math.ceil(ramp_dur * fs);

    let damp = sv_prod(1/2, sv_sum(1, cos_vec(sv_prod(Math.PI / r, Array.from(Array(r).keys())))));
    let ramp = sv_sum(1, sv_prod(-1, damp));
    let mask = ramp.concat(ones(pip_len - 2 * r).concat(damp));

    let waveform = ew_prod(mask,waveformtmp);
    return waveform;

}

export function play_tone(freq, amp){
    if(!aud_ctx) {
        init();
      }
    fs = 44100;
    
    let waveformtmp = Time2Freq(freq); // Time to Freq domain
    let waveform = Cos2Ramp(fs, waveformtmp); // filter Ramp
    let gain = Math.pow(10, amp / 20); // Convert amplitude from dB to linear gain

     // Adjust volume
    waveform = waveform.map(sample => sample * gain);

     let arr_buf = aud_ctx.createBuffer(channels, waveform.length, aud_ctx.sampleRate);//チャンネル数,バッファ,サンプリングレート

     //Fill the buffer with the tone scramble waveform
     for (let channel = 0; channel < channels; channel++) {
       //This gives us the actual array that contains the data
       let now_buffering = arr_buf.getChannelData(channel);
       for (let k = 0; k < waveform.length; k++) {
           now_buffering[k] = waveform[k];
       }
      }
     return [aud_ctx, arr_buf]

}