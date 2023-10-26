//Making new endorse button and calling the class
// Referenced reply and quickreply
<div component="topic/endorse/container" class="btn-group action-bar bottom-sheet <!-- IF !privileges.topics:reply -->hidden<!-- ENDIF !privileges.topics:reply -->">
    <button id = "endorse" class="btn btn-sm btn-primary" component="topic/endorse" type="submit" data-ajaxify="false" role="button"><i class="fa fa-reply visible-xs-inline">
    </i><span class="visible-sm-inline visible-md-inline visible-lg-inline"> [[topic:Endorse]]</span></button>
</div>
<!-- IF loggedIn -->
<!-- IF !privileges.topics:reply --><!-- IF locked --><!-- ENDIF locked --><!-- ENDIF !privileges.topics:reply -->
<!-- IF !locked --><!-- ENDIF !locked --><!-- ELSE --><!-- IF !privileges.topics:reply -->
<!-- ENDIF !privileges.topics:reply --><!-- ENDIF loggedIn --> 