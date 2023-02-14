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
            alert("You win");
            location.reload();
        }
    }, [guessed]);
    
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
                                    onClick={() => selected.length < 2 && setSelected((selected) => selected.concat(image))}
                                >
                                    {selected.includes(image) || guessed.includes(image) ? (
                                        <img 
                                            src={url} 
                                            alt='Icon'
                                        />    
                                    ) : (
                                        <img 
                                            src='https://icongr.am/fontawesome/question-circle.svg?size=128&color=currentColor' 
                                            alt='Question circle'
                                        />
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