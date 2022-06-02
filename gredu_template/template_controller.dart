import 'package:firebase_crashlytics/firebase_crashlytics.dart';
import 'package:gredu_common/gredu_common.dart';

import 'package:gredu_revamp/app/core/base/base_controller.dart';

import 'template_repository.dart';


class TemplateController extends BaseController<TemplateRepository> {

  @override
  void onInit() {
    logI('Template Screen');
    super.onInit();
  }
  
    // TODO: Replace Me (example consume api)
  Future<void> getTemplate() async {
    ExLoading.show(); // delete me if you dont need this
    await repo.getTemplate().then((response) {
      // TODO: do something on success
    }).catchError((error, stackTrace) {
      // error
      FirebaseCrashlytics.instance.recordError(error, stackTrace);
    });
    ExLoading.dismiss();  // delete me if you dont need this
  }
  
  
}
