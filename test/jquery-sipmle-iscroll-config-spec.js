describe('jquery-simple-iscroll', () => {
  it('config', () => {
    let defaults = $.SimpleIscroll.getDefaults();
    expect(defaults.loading).toEqual(null);

    defaults = $.SimpleIscroll.setDefaults({loading: 'elem'});
    expect(defaults.loading).toEqual('elem');
  });
});
