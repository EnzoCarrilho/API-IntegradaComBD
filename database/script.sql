CREATE TABLE tbl_filme(
	id int PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(100) NOT NULL,
	sinopse TEXT,
	data_lancamento DATE,
	duracao TIME,
	orcamento DECIMAL,
	trailer VARCHAR(200),
	capa VARCHAR(200)
);

insert into tbl_filme(
	nome,
	sinopse,
	data_lancamento,
	duracao,
	orcamento,
	trailer,
	capa)
	values ('Whiplash - Em Busca da Perfeição',
			'Em Whiplash - Em Busca da Perfeição, o solitário Andrew (Miles Teller) é um jovem baterista que sonha em ser o melhor de sua geração e marcar seu nome na música americana como fez Buddy Rich, seu maior ídolo na bateria. Após chamar a atenção do reverenciado e impiedoso mestre do jazz Terence Fletcher (JK Simmons), Andrew entra para a orquestra principal do conservatório de Shaffer, a melhor escola de música dos Estados Unidos. Entretanto, a convivência com o abusivo maestro fará Andrew transformar seu sonho em obsessão, fazendo de tudo para chegar a um novo nível como músico, mesmo que isso coloque em risco seus relacionamentos com sua namorada e sua saúde física e mental.',
			'2015-01-08',
			'01:47',
			3300000.00,
			'https://www.adorocinema.com/filmes/filme-225953/',
			'https://m.media-amazon.com/images/I/61tWmSwoDeL._UF894,1000_QL80_.jpg');

insert into tbl_filme(
	nome,
	sinopse,
	data_lancamento,
	duracao,
	orcamento,
	trailer,
	capa)
	values ('O Senhor dos Anéis - A Sociedade do Anel',
			'Numa terra fantástica e única, chamada Terra-Média, um hobbit (seres de estatura entre 80 cm e 1,20 m, com pés peludos e bochechas um pouco avermelhadas) recebe de presente de seu tio o Um Anel, um anel mágico e maligno que precisa ser destruído antes que caia nas mãos do mal. Para isso o hobbit Frodo (Elijah Woods) terá um caminho árduo pela frente, onde encontrará perigo, medo e personagens bizarros. Ao seu lado para o cumprimento desta jornada aos poucos ele poderá contar com outros hobbits, um elfo, um anão, dois humanos e um mago, totalizando 9 pessoas que formarão a Sociedade do Anel.',
			'2001-01-01',
			'02:58',
			93000000.00,
			'https://www.adorocinema.com/filmes/filme-27070/trailer-19390935/',
			'https://img.elo7.com.br/product/zoom/269274A/poster-o-senhor-dos-aneis-a-sociedade-do-anel-lo04-90x60-cm-presente-geek.jpg');
