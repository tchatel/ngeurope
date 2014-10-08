!SLIDE speakers ============================

![](angularjs-logo.png)
### Formation ngEurope
## formulaires et directives


!SLIDE ========================

TODO : fichiers fournis

!SLIDE ========================

TODO : scope isolé

!SLIDE ========================

TODO : template




!SLIDE ========================

# API Google Maps 3/4

    google.maps.event.addListener(map, 'zoom_changed',
            function () {

        // ... map.getZoom()
    });

    google.maps.event.addListener(map, 'center_changed',
            function () {

        // ...map.getCenter()...
    });


!SLIDE bullets ========================

# Etape 1 : <i>afficher une carte</i>

1. Créer la directive `gmaps`

1. Ajouter la classe CSS `gmaps` pour la hauteur du `<div>`

            element.addClass("gmaps");

1. Faire afficher la carte du <i>Hello World</i> de Google Maps
    * en reprenant l'intérieur de la fonction `initialize()`
    * en passant l'élément HTML `element[0]`


!SLIDE bullets ========================

# Etapes 5 & 6 : template séparé

1. Template `gmaps.html` : <br/>`<div><div class="gmaps"></div></div>`
2. `templateUrl: 'gmaps.html`
3. `replace: true`
3. `element.find('div')[0]`


!SLIDE bullets ========================

# Etape 10 : snapshots partagés

_On veut que les snapshots soient communs à toutes les cartes._

1. Publier un service en appelant sur le module :
    * `.value('serviceName', serviceValue)`
    * avec comme valeur un tableau vide

1. Stocker le tableau des snapshots dans le service
    * penser à injecter le service
    * publier le service dans le scope



