/* =========================================================
   MENU HAMBURGUER RESPONSIVO
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu-principal');

    if (hamburger && menu) {
        hamburger.addEventListener('click', () => {
            const aberto = menu.classList.toggle('aberto');
            hamburger.classList.toggle('aberto', aberto);
            hamburger.setAttribute('aria-expanded', aberto ? 'true' : 'false');
            hamburger.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
        });

        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    menu.classList.remove('aberto');
                    hamburger.classList.remove('aberto');
                    hamburger.setAttribute('aria-expanded', 'false');
                    hamburger.setAttribute('aria-label', 'Abrir menu');
                }
            });
        });
    }
});

/* =========================================================
   MONTE SEU TIME IDEAL (dreamteam_campeoes.html)
   ========================================================= */
function getSelectLabel(select) {
    let node = select.previousSibling;

    while (node && node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) {
        node = node.previousSibling;
    }

    if (!node || node.nodeType !== Node.TEXT_NODE) {
        return select.name || 'Posição';
    }

    return node.textContent.trim().replace(/:$/, '') || select.name || 'Posição';
}

function atualizarOpcoesDuplicadas() {
    const selects = Array.from(document.querySelectorAll('select'));
    const valoresEscolhidos = selects
        .map(select => select.value)
        .filter(value => value !== 'escolha');

    selects.forEach(select => {
        select.querySelectorAll('option').forEach(option => {
            if (option.value === 'escolha') {
                option.disabled = false;
                return;
            }

            if (option.value === select.value) {
                option.disabled = false;
                return;
            }

            option.disabled = valoresEscolhidos.includes(option.value);
        });
    });
}

function imprimirOpcao() {
    const selects = Array.from(document.querySelectorAll('select'));
    const exibicao = document.getElementById('exibicao');

    if (!exibicao) return;

    function valorSelecionado(select) {
        const optionSelecionada = select.options[select.selectedIndex];
        return optionSelecionada && optionSelecionada.value !== 'escolha'
            ? optionSelecionada.text
            : '(não selecionado)';
    }

    function jogadorComCamisaERectangulo(nome, top, left, width) {
        return `
            <div style="position: absolute; top: ${top}%; left: ${left}%; width: ${width}%; text-align: center;">
                <img src="imagens/camisa.png" style="width: 48px; height: 48px; margin-bottom: 6px; display: block; margin-left: auto; margin-right: auto;" />
                <div style="background: rgba(255, 255, 255, 0.85); padding: 6px 10px; border-radius: 6px; font-weight: bold; font-size: 13px; line-height: 1.3;">${nome}</div>
            </div>
        `;
    }

    const [goleiro, ld, zd, ze, le, vol, mei1, mei2, pd, ata, pe] = selects.map(valorSelecionado);

    const titulo = `
        <div style="margin-top: 12px; font-family: Arial, sans-serif; max-width: 640px; margin-left: auto; margin-right: auto; text-align: center;">
            <div style="font-size: 1.1rem; font-weight: bold; margin-bottom: 16px;">Sua escalação 4-3-3</div>
        </div>
    `;

    exibicao.innerHTML = titulo;

    const overlay = `
        ${jogadorComCamisaERectangulo(goleiro, 4, 35, 30)}
        ${jogadorComCamisaERectangulo(ld, 24, 6, 18)}
        ${jogadorComCamisaERectangulo(zd, 24, 28, 18)}
        ${jogadorComCamisaERectangulo(ze, 24, 50, 18)}
        ${jogadorComCamisaERectangulo(le, 24, 76, 18)}
        ${jogadorComCamisaERectangulo(vol, 50, 12, 18)}
        ${jogadorComCamisaERectangulo(mei1, 50, 39, 18)}
        ${jogadorComCamisaERectangulo(mei2, 50, 68, 18)}
        ${jogadorComCamisaERectangulo(pd, 72, 13, 18)}
        ${jogadorComCamisaERectangulo(ata, 72, 40, 18)}
        ${jogadorComCamisaERectangulo(pe, 72, 69, 18)}
    `;

    const posicoesOverlay = document.getElementById('posicoes-overlay');
    if (posicoesOverlay) {
        posicoesOverlay.innerHTML = overlay;
    }

    const campoContainer = document.getElementById('campo-container');
    if (campoContainer) {
        campoContainer.style.display = 'block';
    }

    const resultadosWrapper = document.getElementById('resultados-wrapper');
    if (resultadosWrapper) {
        resultadosWrapper.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        select.addEventListener('change', atualizarOpcoesDuplicadas);
    });

    atualizarOpcoesDuplicadas();
});

/* =========================================================
   MONTE SUA CONVOCAÇÃO (sua_convocacao.html)
   ========================================================= */
function mostrarConvocacao() {
    const categorias = [
        { nome: 'Goleiros', prefixo: 'goleiro', quantidade: 3 },
        { nome: 'Laterais', prefixo: 'lateral', quantidade: 4 },
        { nome: 'Zagueiros', prefixo: 'zagueiro', quantidade: 4 },
        { nome: 'Meias', prefixo: 'meia', quantidade: 6 },
        { nome: 'Atacantes', prefixo: 'atacante', quantidade: 9 }
    ];
    const resultado = categorias.map(categoria => {
        const jogadores = [];
        for (let i = 1; i <= categoria.quantidade; i++) {
            const campo = document.getElementById(categoria.prefixo + i);
            const valor = campo ? campo.value.trim() : '';
            jogadores.push(valor || `Jogador ${i}`);
        }
        return `
            <section>
                <h3>${categoria.nome}</h3>
                <ol>
                    ${jogadores.map(jogador => `<li>${jogador}</li>`).join('')}
                </ol>
            </section>`;
    }).join('');
    const convocacaoFinal = document.getElementById('convocacao-final');
    if (convocacaoFinal) {
        convocacaoFinal.innerHTML = resultado;
        convocacaoFinal.scrollIntoView({ behavior: 'smooth' });
    }
}

/* =========================================================
   QUIZ (quiz.html)
   ========================================================= */
function calculateScore() {
    let score = 0;
    const answers = {
        q1: '5',
        q2: 'Ronaldo',
        q3: ['1950', '2014'],
        q4: '1-2',
        q5: '23',
        q6: 'Ronaldo Fenômeno, com 8 gols',
        q7: ['Pelé', 'Vavá'],
        q8: '1970',
        q9: 'Roberto Baggio',
        q10: 'Mauro Ramos'
    };

    const resultDiv = document.getElementById('result');
    if (!resultDiv) return;

    for (let q in answers) {
        const expected = answers[q];

        if (Array.isArray(expected)) {
            const selected = Array.from(document.querySelectorAll(`input[name="${q}"]:checked`)).map(el => el.value);
            if (selected.length === expected.length && expected.every(value => selected.includes(value))) {
                score++;
            }
        } else {
            const selected = document.querySelector(`input[name="${q}"]:checked`);
            if (selected && selected.value === expected) {
                score++;
            }
        }
    }

    resultDiv.innerHTML = `Você acertou ${score} de 10 perguntas!`;
    if (score === 10) {
        resultDiv.innerHTML += ' Parabéns, você é um expert!';
    } else if (score >= 6) {
        resultDiv.innerHTML += ' Bom trabalho!';
    } else {
        resultDiv.innerHTML += ' Estude mais sobre o Brasil nas Copas!';
    }
}
