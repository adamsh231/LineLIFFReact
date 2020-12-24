import '../css/FAB.css';

function FAB() {
    return (
        <div class="btn-group-fab" role="group" aria-label="FAB Menu">
            <div>
                <input type="hidden" id="fab-count-hidden" value="0"/>
                <button type="button" class="btn btn-main btn-primary has-tooltip" id="fab-count">0</button>
            </div>
        </div>
    );
}

export default FAB;
