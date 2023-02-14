import { useState, useEffect } from 'react';

const IMAGES = [
    'https://icongr.am/devicon/go-original.svg?size=128&color=currentColor',
    'https://icongr.am/devicon/linux-original.svg?size=128&color=currentColor',
    'https://icongr.am/devicon/mysql-original.svg?size=128&color=currentColor',
    'https://icongr.am/devicon/postgresql-original.svg?size=128&color=currentColor',
    'https://icongr.am/devicon/gitlab-original.svg?size=128&color=currentColor',
    'https://icongr.am/devicon/bower-original.svg?size=128&color=currentColor',
    'https://icongr.am/devicon/krakenjs-original.svg?size=128&color=currentColor',
    'https://icongr.am/devicon/docker-original.svg?size=128&color=currentColor',
    'https://icongr.am/devicon/foundation-original.svg?size=128&color=currentColor',
    'https://icongr.am/devicon/gimp-original.svg?size=128&color=currentColor',
]
.flatMap(image => [`a|${image}`, `b|${image}`])
.sort(() => Math.random() - 0.5);

import question from './assets/question-circle.svg';

const App = () => {

    const [guessed, setGuessed] = useState<string[]>([]);
    const [selected, setSelected] = useState<string[]>([]);

    useEffect(() => {
        if (selected.length === 2) {
            if(selected[0].split('|')[1] === selected[1].split('|')[1]){
                setGuessed((guessed) => guessed.concat(selected));
            }

            setTimeout(() => setSelected([]), 750);
        }
    }, [selected]);

    useEffect(() => {
        if(guessed.length === IMAGES.length){
            alert('You win');
            location.reload();
        }
    }, [guessed]);

    const handleSelected = (image: string) => {
        if(!selected.includes(image) && !guessed.includes(image) && selected.length < 2 ){
            setSelected((selected) => selected.concat(image))
        }
    }

    return (
        <main>
            <h1>Memotest</h1>
            <ul className='memo-container'>
                {IMAGES.map((image) => {
                    const [, url] = image.split('|');

                    return(
                        (
                            <li 
                                key={image}
                                onClick={() => handleSelected(image)}
                                className={selected.includes(image) || guessed.includes(image) ? 'memo-flipped clicked' : ''}
                            >
                                {selected.includes(image) || guessed.includes(image) ? (
                                    <img src={url} alt='Icon' />    
                                ) : (
                                    <img src={question} alt='Question circle' />
                                )}
                            </li>
                        )
                    )
                })}
            </ul>
        </main>
    )
};

export default App;