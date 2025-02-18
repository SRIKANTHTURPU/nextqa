export const reportBuilderPage = {
    librarry_ActionButtons: () => cy.get(".MuiTypography-root.MuiTypography-inherit"),
    showHide_Library_Panel_Button: () => cy.get("button[id=':ro:']"),
    workbook_Filters: () => cy.get("[data-testid='FilterAltIcon']"),
    library_AdvancedSearch_Button: () => cy.get("[data-testid='TuneSharpIcon']"),
    library_SearchBar: () => cy.get("input[placeholder='Quick search...']"),
    library_SearchResult: () => cy.get("[data-testid='search-result-0']"),

    actions: {
        librarySearch: (libraryComponent: string) => {
            reportBuilderPage.library_SearchBar().click().type(libraryComponent)
            reportBuilderPage.library_SearchResult().contains(libraryComponent).click({ force: true })
        },
        dragAndDropOfComponent: () => {
            cy.get(".metric-name").contains("Suggested metric 1").parent().prev().then(($dragElement) => {
                const dragOffset = $dragElement.offset();
                const dragWidth = $dragElement.width();
                const dragHeight = $dragElement.height();
                const startX = dragOffset.left + dragWidth / 2;
                const startY = dragOffset.top + dragHeight / 2;
                
                cy.get(".table-cell.css-1ryfbl6").contains("Filters").parent().parent().next().find(".css-5ght4r").then(($dropElement) => {
                    const dropOffset = $dropElement.offset();
                    const dropWidth = $dropElement.width();
                    const dropHeight = $dropElement.height();
                    const targetX = dropOffset.left + dropWidth / 2;
                    const targetY = dropOffset.top + dropHeight / 2;
                    
                    cy.get(".metric-name").contains("Suggested metric 1").parent().prev()
                        .trigger('mousedown', { which: 1, pageX: startX, pageY: startY })
                        .trigger('mousemove', { clientX: targetX, clientY: targetY })
                        .trigger('mouseup', { force: true, pageX: targetX, pageY: targetY });
                });
            });
        }
    }
}

