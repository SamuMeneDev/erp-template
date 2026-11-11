## 🔐 Gerenciamento de Perfis (Profiles) e Ambiente

A aplicação utiliza o conceito de perfis do Spring Boot para separar o comportamento de desenvolvimento (mutilização de mocks e massa de dados local) das regras rígidas de produção.

O ecossistema local foi projetado para ler essas configurações automaticamente a partir do arquivo `.env` localizado na raiz do projeto, utilizando a ferramenta `dotenv-cli`.

### 🛠️ Configuração Local (Desenvolvimento)

Certifique-se de que o seu arquivo `.env` na raiz contenha a seguinte variável apontando para o ambiente de desenvolvimento:

```env
SPRING_PROFILES_ACTIVE=dev
```

> **Nota:** Quando o profile `dev` está ativo, o componente `@DevelopmentSeeder` entra em ação, populando o banco de dados local automaticamente a cada inicialização com os dados de teste contidos nos arquivos `.json`.

---

### 🚀 Configuração em Produção (Deploy / Docker)

Ao realizar o deploy da API (em plataformas como Render, Koyeb ou AWS EC2), o Spring Boot **não** dependerá do arquivo `.env` ou do `package.json` para definir o perfil. O container Docker executará o arquivo `.jar` puro de forma otimizada.

Para garantir que o sistema inicialize no modo de produção de forma segura:

1. Acesse o painel da sua plataforma de hospedagem.
2. Vá até a seção de **Variáveis de Ambiente (Environment Variables)** do serviço.
3. Injete manualmente a seguinte chave:
   * **Chave (Key):** `SPRING_PROFILES_ACTIVE`
   * **Valor (Value):** `prod`

Isso desativará imediatamente a carga de arquivos JSON locais, validará a estrutura do banco de dados na nuvem e garantirá a execução segura e leve da API.
