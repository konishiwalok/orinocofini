const header = `
<header>
    <nav class="navbar navbar-expand-sm navbar-light " id="navbar">
    <div class="container-fluid">
            <a class="navbar-brand px-5 " href="index.html">
            <img src="img/logo.png" alt="" width="200">
            </a>
            
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse px-4" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto ">
                <li class="nav-item"><a class="nav-link active stilo700 h4" aria-current="page" href="index.html">Accueil</a></li>
                <li class="nav-item"><a class="nav-link stilo700 h4" href="cart.html">Panier</a></li>
                <li class="nav-item"><a class="nav-link stilo700 h4" href="#">Register</a></li>
            </ul>
            </div>
            
        </div>
    </nav>
    
</header>
`

document.body.insertAdjacentHTML('afterbegin', header);
