// About.js
import React from 'react';
import './About.css';
import AboutModule from './AboutModule';

const modulesData = [
  {
    name: 'Spandan Patel',
    biography: 'Spandan is a high school senior at Carroll Senior High School. He plans to major in Computer Science in college. In his free time, he enjoys playing video games and build robots.',
    imageUrl: 'https://cdn.discordapp.com/attachments/1143250284982845533/1152892064476958770/image.png', // Replace with actual image URLs
  },
  {
    name: 'Krish Dalela',
    biography: 'Krish is a high school senior at Carroll Senior High School. He plans to major in Electrical Engineering in college. In his free time, he likes to play Minecraft and play the guitar.',
    imageUrl: 'https://camo.githubusercontent.com/c6fe2c13c27fe87ac6581b9fe289d2f071bd1b4ef6f3e3c5fc2aba0bbc23fd88/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f372f37632f50726f66696c655f6176617461725f706c616365686f6c6465725f6c617267652e706e67',
  },
  {
    name: 'Christian Delashmit',
    biography: 'Christian is a high school senior at Carroll Senior High School. He plans to major in Computer Science in college. IN his free time, he enjoys hacking and video games.',
    imageUrl: 'https://cdn.discordapp.com/attachments/1143250284982845533/1152890725084712980/image0.jpg',
  },
  {
    name: 'Dhyan Patel',
    biography: 'Dhyan is a high school senior at Carroll Senior High School. He hopes to major in Computer Science in college. In his free time, he likes to play R6 Siege and watch Formula One.',
    imageUrl: 'https://lh3.googleusercontent.com/pw/AIL4fc-rsv6F344GWrLrRlyMSbG9KOEVa9nmq1Wc1l-CtPUeQvwD82rn6aMS1yIdYFgrKfaW17LCGXTme_CjeYZUzifiu6_sVINwzBr502EnF2xxo6unlqO-FAV9pxVOOZYPrg3EF5IQnS0qP9BZFeJ4-Dlv5T3v_IWkhhvzmiY-l_Li-M_nJQHZas8Z5HST8Us7HyrUaMxI6mEvCbdcRi152ghlkQUNncLiiAXVcvA1g_lzVDhD2mTpQnXbApq1JmZWRJ9XaBAO1Fl_CkP1PxCZHo_JFeApq_UmLoIr969yGJCUaRCQBoEBEneS0-UOYLNErLXbARQ_BZZn4x1AtRagHBU7LDZO03o8ANXEm4jdYXBoOZOdE-7XDVHGL5u2syxdQK5SiSIRunj0lPrLOoh9-CqS4pgpbo0iz9mxuQBeBxt4uUS2SWb7guCruDwldj8ffQicfjbkohC8gPmR5RBrZ4uSFKOK_k9gP54DAv7NaV4FRwLNQCGFs9JssBqjXru0kMGtvCulaGuIh01yjc7_KNgAln6Dv6nRlc1rCSzfkrg6MuusCmCDtoS0SPxckiRBWooyFHYaHQdSVS1_gckjxEnIIa8dWDWiPPVuUSjytKKEYvLEDwOOjFxkI2EOGMACb6GPM1SRbeDjxR_WowgpLzJ1wrV17MY4u9r0hef3h8n7lchZcsSyfcUDAo0iIDejfDys93MlyLw8Dr5oAsIfSrpAxNKb5UlzPcs2wBSHaSdtG1qNHaCdGrE66_vb7dqIuwdgW3bQ8GDDh_reabH0LPjeLm2KvWKpmn4AuPVooAuT8CWYLzUepryjXWQSa6L71SNnHZdTlcXuoEvuDawBn4v09Mk1GZ5vcys0D2MVub_k9cmhDHzdCBA-HIpAVNaxvA097W_aDa4KjSrbk1qFdK9nRwk=w903-h1205-s-no?authuser=0',
  },
];

function About() {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      {modulesData.map((data, index) => (
        <AboutModule
          key={index}
          name={data.name}
          biography={data.biography}
          imageUrl={data.imageUrl}
        />
      ))}
    </div>
  );
}

export default About;