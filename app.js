import * as dotenv from 'dotenv';
import { OpenAI } from 'openai';
import fs from 'fs';

dotenv.config();

const openai = new OpenAI(process.env.OPENAI_API_KEY);

const base64Image = fs.readFileSync('imagenes/HORARIO.png', { encoding: 'base64' });

// Inicia el contador de tiempo
const startTime = new Date();

// Realiza la petición a la API de OpenAI
const response = await openai.chat.completions.create({
  model: 'gpt-4-vision-preview',
  messages: [
    {
      role: 'system',
      content: [
        {
          type: 'text',
          text: 'Retornar una estructura JSON basado en los requerimientos del usuario. only return the JSON structure, nothing else. Do not return ```json',
        },
      ],
    },
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text: 'De la imgen cargada sacame todos los datos en este modelo de diferentes dias de lunes a sabado, ademas identificar los colores de manera Hexadecimal, todo en estructura de Json {\"NombreDeCurso\":\"\",\"HoraInicio\":\"\",\"HoraFin\":\"\",\"DiaSemana\":\"\",\"ColorCurso\":\"\"}',
        },
        {
          type: 'image_url',
          image_url: {
            url: `data:image/png;base64,${base64Image}`,
          },
        },
      ],
    },
  ],
  max_tokens: 1000,
});

// Finaliza el contador de tiempo
const endTime = new Date();

// Calcula la duración de la petición en milisegundos
const duration = endTime - startTime;

console.log('Tiempo de respuesta:', duration, 'milisegundos');
console.log(response.choices[0].message.content);
