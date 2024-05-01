import { clipboard } from "@tauri-apps/api";
import { invoke } from "@tauri-apps/api/tauri";
import { appWindow } from "@tauri-apps/api/window";

let closeBtn: HTMLElement | null;
let inputData: HTMLInputElement | null;
let output: HTMLElement | null;

const close = (): void => {
  appWindow.close();
}

const processData = async (data: string, selectedOption: string, outputElem: HTMLElement): Promise<void> => {
  
  let result: string = '';

  if (data.trim() === '') {
    result = 'Output';
  } else {
    if (selectedOption === 'encode') {
      result = await invoke('encode', {
        data
      });
    } else {
      result = await invoke('decode', {
        data
      });
    }
  }

  outputElem.textContent = result;
}

window.addEventListener("DOMContentLoaded", () => {
  closeBtn = document.querySelector('#closeBtn');
  inputData = document.querySelector('#data');
  output = document.querySelector('.output');

  closeBtn?.addEventListener('click', () => {
    close();
  });

  inputData?.addEventListener('keypress', function (e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      const option = document.querySelector('input[type="radio"]:checked') as HTMLInputElement;
      processData(this.value, option.value, output!);
    }
  });

  output?.addEventListener('click', function (): void {
    if (this.textContent?.trim() === 'Output') return
    const value = this.textContent;
    clipboard.writeText(value!);

    this.textContent = 'Copied to clipboard!';

    setTimeout(() => {
      this.textContent = value;
    }, 1000);
  })
});
